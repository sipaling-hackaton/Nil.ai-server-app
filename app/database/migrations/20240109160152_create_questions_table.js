/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('questions', function (table) {
        table.string('id').primary();
        table.string('question').notNullable();   
        table.string('assignment_id').references('id').inTable('assignments').onDelete('CASCADE');        
        table.timestamps(true, true);
      });  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('questions', function (table) {
        table.dropForeign('assignment_id');
    }).dropTable('questions');
};
