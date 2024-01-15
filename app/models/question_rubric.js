const { Model } = require('objection');
const knex = require('../database/knex');
const Question = require('./questions');

Model.knex(knex);

class QuestionRubric extends Model {
  static get tableName() {
    return 'question_rubrics';
  }

  static get relationMappings() {
    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'question_rubrics.question_id',
          to: 'questions.id',
        },
      },
    };
  }
}

module.exports = QuestionRubric;
