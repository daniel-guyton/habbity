const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getHabits,
  addHabits,
  getUsers,
  getOneUser,
  getOneHabit,
}

//*   HABITS
//* ==========

function getHabits(db = connection) {
  
  return db('habits').select()
}

function getOneHabit(id, db = connection) {
  return db('habits').select().where('id', id).first()
}

function addHabits(newHabit, db = connection) {
  const { daysCompleted, goal } = newHabit
  return db('habits')
    .insert({ daysCompleted, goal })
    .returning('id')
    .then(([{ id }]) => {
      return db('habits')
        .select()
        .where('id', id)
        .first()
    })
}

// function deleteHabit(){}

// function updateHabit(id, updatedHabit, db = connection){
//   return db('habits')
//   .where('id', id)
//   .update(updatedHabit)
// }

//*   USERS
//* =========

function getUsers(db = connection) {
  return db('users').select()
}

function getOneUser(id, db = connection) {
  return db('users').select().where('id', id).first()
}
