const { Model } = require('objection')
const knex = require("../database/knex") 

Model.knex(knex)

class QuestionRubric extends Model { 
    static get tableName(){
        return 'question_rubrics'
    }
}

module.exports = QuestionRubric