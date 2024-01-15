const { Model } = require('objection');
const knex = require('../database/knex');
const QuestionRubric = require('./question_rubric');
const Assignment = require('./assignment');

Model.knex(knex);

class Question extends Model {
  static get tableName() {
    return 'questions';
  }

  static get relationMappings() {
    return {
      rubrics: {
        relation: Model.HasManyRelation,
        modelClass: QuestionRubric,
        join: {
          from: 'questions.id',
          to: 'question_rubrics.question_id',
        },
      },
      assignment: {
        relation: Model.BelongsToOneRelation,
        modelClass: Assignment, 
        join: {
          from: 'questions.assignment_id',
          to: 'assignments.id',
        },
      },      
    };
  }
}

module.exports = Question;
