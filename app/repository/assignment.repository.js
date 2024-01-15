const Assignment = require('../models/assignment')
const Question = require('../models/questions')
const QuestionRubric = require('../models/question_rubric');
const { Model } = require("objection");
const { ForeignKeyViolationError } = require("../helpers/errors/custom_exception");
const { v4: uuid } = require("uuid");
const knex = require('../database/knex');

class AssignmentRepository {

    static async createAssignment(data) {
        const {
            id,
            code = "",
            title,
            description,
            class_id,
            open_sub_time,
            close_sub_time,
            questions,
            rubrics
        } = data;
    
        return new Promise(async (resolve, reject) => {
            try {
                await Model.transaction(async (trx) => {
                    await Assignment.query().insert({
                        id, code, title, description, class_id, open_sub_time, close_sub_time
                    });
                    if (questions.length > 0) {
                        const insertQuery = Question.query().insert(questions);
                        await knex('questions').insert(questions);                        
                    }
                    if (rubrics.length > 0) {
                        const insertQuery = QuestionRubric.query().insert(rubrics);
                        await knex('question_rubrics').insert(rubrics);                       
                    }
                    resolve(true);
                }).catch(err => {
                    reject(err);
                });
            } catch (err) {
                reject(err);
            }
        }).then((result) => {
            return true;
        }).catch((err) => {
            console.log(err)
            return false;
        });
    }
    


    static async getAssignments(user, class_id){
        const data = await Assignment.query()
            .join('classes', 'classes.id', '=', 'assignments.class_id')
            .join('users', 'users.id', '=', 'classes.teacher_id')
            .where({'classes.id' : class_id, 'users.id' : user.id});

        return data;

    }

    static async getAssignmentsByID(user, id){
        const assignment = await Assignment.query()
            .join('classes', 'classes.id', '=', 'assignments.class_id')
            .join('users', 'users.id', '=', 'classes.teacher_id')
            .where({'assignments.id' : id, 'users.id' : user.id})
            .first(); 
    
        if (!assignment) return null;

        const questions = await Question.query()
            .withGraphFetched('rubrics')
            .join('assignments', 'assignments.id','=','questions.assignment_id')
            .where({'assignments.id' : id});

        return { ...assignment, questions}
    }

    static async updateAssignment(user, id, data) {
        const {
            code = "",
            title,
            description,
            open_sub_time,
            close_sub_time,
            questions,
            rubrics
        } = data;
    
        try {
            const success = await Assignment.query()
                .join('classes', 'classes.id', '=', 'assignments.class_id')
                .join('users', 'users.id', '=', 'classes.teacher_id')
                .where({'assignments.id': id, 'users.id': user.id})
                .update({title, description, open_sub_time, close_sub_time});
    
            if (!success) return null;
    
            // edit questions and rubrics
            await new Promise(async (resolve, reject) => {
                try {
                    await Model.transaction(async (trx) => {
                        await Question.query()
                            .where({'assignment_id': id})
                            .delete();
    
                        await Question.query().insert(questions);
                        await QuestionRubric.query().insert(rubrics);
                        resolve(true);
                    }).catch(err => {
                        reject(err);
                    });
                } catch (err) {
                    reject(err);
                }
            });
            
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    

    static async deleteAssignment(user, id){

        const data = await Assignment.query()
            .join('classes', 'classes.id', '=', 'assignments.class_id')
            .join('users', 'users.id', '=', 'classes.teacher_id')
            .where({'assignments.id' : id, 'users.id' : user.id})
            .first();
        
        if (!data) return null;

        const success = await Assignment.query()
            .where({id})
            .delete();

        return success;
    }
}

module.exports = AssignmentRepository