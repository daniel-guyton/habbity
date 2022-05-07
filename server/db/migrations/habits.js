/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('habits', (table) => {
    table.increments('id')
    table.integer('userID') //.references('users.id') <- this can force habits to have an existing owner so new owners don't inherit misplaced habits. Commented out for development
    table.timestamp('daysCompleted')
    table.string('goal')
    table.timestamp('timestamp')
    table.string('status')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('habits')
}
