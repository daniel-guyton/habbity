/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  return knex.schema.createTable('habits', (table) => {
    table.increments()
    table.string('name')
    table.string('points')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('habits')
}
