const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getHabits,
  addHabit,
  getUsers,
  getOneUser,
  getOneHabit,
  updateHabit,
}

//*   HABITS
//* ==========

function getHabits(userId, db = connection) {
  return db('habits').select().where('userID', userId)
}

function getOneHabit(id, db = connection) {
  return db('habits').select().where('id', id).first()
}

function addHabit(newHabit, db = connection) {
  // TODO: What's happening here. Is there a specific property we're excluding?
  // this is something that it would be good to have a comment explaining
  const { userID, daysCompleted, goal, status, timestamp, goalCompletedAt } =
    newHabit
  return db('habits')
    .insert({ userID, daysCompleted, goal, status, timestamp, goalCompletedAt })
    .returning('id')
    .then(([{ id }]) => {
      return db('habits').select().where('id', id).first()
    })
}

function updateHabit(habit, db = connection) {
  return db('habits')
    .update(habit)
    .where({ userID: habit.userID, id: habit.id })
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
