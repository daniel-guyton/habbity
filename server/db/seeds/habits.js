/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  await knex('habits').del()
  await knex('habits').insert([
    { id: 10002, name: 'bob', points: 420 },
    { id: 20002, name: 'bobby', points: 1337 },
    { id: 40002, name: 'bobina', points: 80085 },
    { id: 80002, name: 'bobtina', points: 69 }
  ])
}

