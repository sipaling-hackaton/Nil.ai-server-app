const { Model } = require('objection');
const knex = require('../database/knex');
const Class = require('./Class');

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      classes: {
        relation: Model.HasManyRelation,
        modelClass: Class,
        join: {
          from: 'users.id',
          to: 'classes.user_id',
        },
      },
    };
  }
}

module.exports = User;
