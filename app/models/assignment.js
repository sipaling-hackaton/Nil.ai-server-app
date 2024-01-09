const { Model } = require('objection')
const knex = require("../database/knex") 

Model.knex(knex)

class Assignment extends Model { 
    static get tableName(){
        return 'assignments'
    }
}

module.exports = Assignment