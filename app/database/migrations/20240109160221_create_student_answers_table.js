/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('student_answers', function (table) {
        table.string('id').primary();
        table.string('answer').nullable();
        table.string('question_id').references('id').inTable('questions').onDelete('CASCADE');        
        table.string('rubric_id').references('id').inTable('question_rubrics').onDelete('SET NULL');        
        table.timestamps(true, true);
      });  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('student_answers', function (table) {
        table.dropForeign('question_id');
        table.dropForeign('rubric_id');
    }).dropTable('student_answers');
};
