const { Model } = require('objection');
const knex = require('../database/knex');
const User = require('./user');
const Assignment = require('./assignment');

Model.knex(knex);

class Class extends Model {
  static get tableName() {
    return 'classes';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'classes.user_id',
          to: 'users.id',
        },
      },
      assignments: {
        relation: Model.HasManyRelation,
        modelClass: Assignment,
        join: {
          from: 'classes.id',
          to: 'assignments.class_id',
        },
      },
    };
  }
}

module.exports = Class;
