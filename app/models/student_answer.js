const { Model } = require('objection')
const knex = require("../database/knex") 

Model.knex(knex)

class StudentAnswer extends Model { 
    static get tableName(){
        return 'student_answers'
    }
}

module.exports = StudentAnswer