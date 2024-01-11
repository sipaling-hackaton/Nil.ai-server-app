/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('classes', function (table) {
        table.string('id').primary();
        table.string('code').notNullable();
        table.string('title').notNullable();
        table.string('description').nullable();        
        table.string('teacher_id').references('id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true);
      });  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('classes', function (table) {
        table.dropForeign('teacher_id');
    }).dropTable('classes');
};
