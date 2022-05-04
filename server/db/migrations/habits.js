/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  return knex.schema.createTable('habits', (table) => {
    table.increments('id')
    table.integer('userID') //.references('users.id') <- this can force habits to have an existing owner so new owners don't inherit misplaced habits. Commented out for development
    table.integer('daysCompleted')
    table.string('goal')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('habits')
}
