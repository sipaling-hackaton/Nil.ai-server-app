/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('assignments', function (table) {
        table.string('id').primary();
        table.string('code').notNullable();
        table.string('title').notNullable();
        table.string('description').nullable();        
        table.string('class_id').references('id').inTable('classes').onDelete('CASCADE');        
        table.timestamp('open_sub_time').nullable();
        table.timestamp('close_sub_time').nullable();
        table.timestamps(true, true);
      });  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('assignments', function (table) {
        table.dropForeign('class_id');
    }).dropTable('assignments');
};
