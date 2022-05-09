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
      timestamp: 1221222222, //sep 13 2008
      status: 'progress',
      goalCompletedAt: 0,
    },
    {
      userID: 3,
      daysCompleted: 3,
      goal: 'walk',
      timestamp: 1227222922, //Nov 21 2008
      status: 'completed',
      goalCompletedAt: 0,
    },
    {
      userID: '62750d593401c3006704d09c',
      daysCompleted: 1,
      goal: 'go to sleep',
      timestamp: 1651012000, //27 april 2022
      status: 'completed',
      goalCompletedAt: 0,
    },
    {
      userID: '62750d593401c3006704d09c',
      daysCompleted: 2,
      goal: 'practice something else',
      timestamp: 1651082000, //28 april 2022
      status: 'completed',
      goalCompletedAt: 0,
    },
    {
      userID: '62750d593401c3006704d09c',
      daysCompleted: 2,
      goal: 'practice something else',
      timestamp: 1651410000, //2 may 2022
      status: 'failed',
      goalCompletedAt: 0,
    },
  ])
}
