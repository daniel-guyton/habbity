const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getHabits,
  addHabit,
  getUser,
  getOneHabit,
  updateHabit,
  addUser,
  updateUserById,
  isInDb,
  updateProfile,
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

function updateProfile({ id, ...restProfile }, db = connection) {
  return db('users').update(restProfile).where({ auth0: id })
}
//*   USERS
//* =========

function getUser(auth0, db = connection) {
  return db('users')
    .select()
    .where({
      auth0: auth0,
    })
    .first()
}

function addUser(user, db = connection) {
  const { name, email, auth0Id } = user
  const auth0 = auth0Id.split('|')[1]
  return db('users')
    .select()
    .insert({
      username: name,
      email: email,
      auth0: auth0,
      points: 0,
    })
    .returning('id')
}

function updateUserById(data, db = connection) {
  const { badges, auth0Id } = data
  const auth0 = auth0Id.split('|')[1]
  return db('users')
    .select()
    .where({
      auth0: auth0,
    })
    .update({
      badges: badges,
    })
}

function isInDb(auth0, db = connection) {
  return db('users')
    .count('auth0 as n')
    .where({ auth0 })
    .then((count) => {
      return count[0].n > 0
    })
}
