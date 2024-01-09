const { Model } = require('objection')
const knex = require("../database/knex") 

Model.knex(knex)

class Question extends Model { 
    static get tableName(){
        return 'questions'
    }
}

module.exports = Question