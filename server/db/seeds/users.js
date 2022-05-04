/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          auth0_id: 'auth0|10002',
          days_completed: 2,
          goal: 'practice something',
        },
        { auth0_id: 'auth0|20002', days_completed: 3, goal: 'walk' },
        { auth0_id: 'auth0|40002', days_completed: 1, goal: 'go to sleep' },
        {
          auth0_id: 'auth0|10002',
          days_completed: 2,
          goal: 'practice something else',
        },
      ])
    })
}
