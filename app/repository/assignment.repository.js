const Assignment = require('../models/assignment')
const Question = require('../models/questions')
const QuestionRubric = require('../models/question_rubric');
const { Model } = require("objection");
const { v4: uuid } = require("uuid");

class AssignmentRepository {
    static async createAssignment(data){
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

        Model.transaction(async (trx) => {
            await Assignment.query().insert({
                id, code, title, description, class_id, open_sub_time, close_sub_time
            });
            await Question.query().insert(questions);
            await QuestionRubric.query().insert(rubrics);
        })

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

        const questions = await Question.query()
            .withGraphFetched('rubrics')
            .join('assignments', 'assignments.id','=','questions.assignment_id')
            .where({'assignments.id' : id});

        return { assignment, questions }
    }

    static async updateAssignment(user, id, data){

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