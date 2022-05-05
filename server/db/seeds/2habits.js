/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('habits').insert([
    {
      userID: 2,
      daysCompleted: 2,
      goal: 'practice something',
    },
    { userID: 3, daysCompleted: 3, goal: 'walk' },
    { userID: 2, daysCompleted: 1, goal: 'go to sleep' },
    {
      userID: 2,
      daysCompleted: 2,
      goal: 'practice something else',
    },
  ])
}

