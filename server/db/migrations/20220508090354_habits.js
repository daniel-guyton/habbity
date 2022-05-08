
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 exports.up = function (knex) {
  return knex.schema.createTable('habits', (table) => {
    table.increments('id')
<<<<<<< HEAD:server/db/migrations/habits.js
    table.string('userID') //.references('users.id') <- this can force habits to have an existing owner so new owners don't inherit misplaced habits. Commented out for development
||||||| 2c2515e:server/db/migrations/habits.js
    table.integer('userID') //.references('users.id') <- this can force habits to have an existing owner so new owners don't inherit misplaced habits. Commented out for development
=======
    table.string('userID')//.references('users.id') <- this can force habits to have an existing owner so new owners don't inherit misplaced habits. Commented out for development
>>>>>>> dev:server/db/migrations/20220508090354_habits.js
    table.integer('daysCompleted')
    table.string('goal')
    table.bigInteger('timestamp')
    table.string('status')
    table.integer('goalCompletedAt')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('habits')
}

