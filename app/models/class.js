const { Model } = require('objection')
const knex = require("../database/knex") 

Model.knex(knex)

class Class extends Model { 
    static get tableName(){
        return 'classes'
    }
}

module.exports = Class