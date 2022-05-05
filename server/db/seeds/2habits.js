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
      timestamp: 1651715319081,
      status: 'progress',
    },
    {
      userID: 3,
      daysCompleted: 3,
      goal: 'walk',
      timestamp: 1651715729020,
      status: 'completed',
    },
    {
      userID: 2,
      daysCompleted: 1,
      goal: 'go to sleep',
      timestamp: 1651579200081,
      status: 'progress',
    },
    {
      userID: 2,
      daysCompleted: 2,
      goal: 'practice something else',
      timestamp: 1651492799081,
      status: 'failed',
    },
  ])
}

