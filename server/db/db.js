const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getHabits,
  addHabits,
}

function getHabits(db = connection) {
  return db('habits').select()
}

function addHabits(newHabit, db = connection) {
  const { name, points } = newHabit
  return db(`habits`)
    .insert({ name, points })
    .then(([id]) => {
      return { id, name, points }
    })
}
