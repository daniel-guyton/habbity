/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').insert([
    { username: 'bob', email: 'socks@yahoo.com', auth0: '', points: 420 },
    { username: 'bobby', email: 'fish@yahoo.com', auth0: '', points: 1337 },
    { username: 'bobina', email: 'green@gmail.com', auth0: '', points: 80085 },
    {
      username: 'bobtina',
      email: 'slartibartfast@hotmail.co.uk',
      auth0: '',
      points: 69,
    },
  ])
}