/*
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('question_rubrics', function (table) {
        table.string('id').primary();
        table.string('description').notNullable();
        table.integer('point').notNullable();
        table.string('question_id').references('id').inTable('questions');        
        table.timestamps(true, true);
      });  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('question_rubrics', function (table) {
        table.dropForeign('question_id');
    }).dropTable('question_rubrics');
};
