const { Model } = require('objection')
const knex = require("../database/knex") 
const Class = require('./class');
const Question = require('./questions');


Model.knex(knex)

class Assignment extends Model { 
    static get tableName(){
        return 'assignments'
    }

    static get relationMappings() {
        return {
          class: {
            relation: Model.BelongsToOneRelation,
            modelClass: Class,
            join: {
              from: 'assignments.class_id',
              to: 'classes.id',
            },
          },
          questions: {
            relation: Model.HasManyRelation,
            modelClass: Question,
            join: {
              from: 'assignments.id',
              to: 'questions.assignment_id',
            },
          },
        };
      }    
}

module.exports = Assignment