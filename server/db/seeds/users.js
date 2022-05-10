/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').insert([
    {
      username: 'bob',
      email: 'socks@yahoo.com',
      auth0: '',
      points: 420,
      badges: '',
    },
    {
      username: 'bobby',
      email: 'fish@yahoo.com',
      auth0: '',
      points: 1337,
      badges: '',
    },
    {
      username: 'bobina',
      email: 'green@gmail.com',
      auth0: '627876170b600f00693e7225',
      points: 11,
      badges:
        'https://giphy.com/embed/S6flijUIK7PdtRMF6N,https://giphy.com/embed/S6flijUIK7PdtRMF6N,https://giphy.com/embed/S6flijUIK7PdtRMF6N',
    },
    {
      username: 'bobtina',
      email: 'slartibartfast@hotmail.co.uk',
      auth0: '',
      points: 69,
      badges: '',
    },
  ])
}
