const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getHabits,
  addHabits,
  getUsers,
  getOneUser,
  getOneHabit
}

function getHabits(db = connection) {
  
  return db('habits').select()
}

function getOneHabit(id, db = connection) {
  console.log('db reached')
  return db('habits').select().where('id', id).first()
}

function addHabits(newHabit, db = connection) {
  const { daysCompleted, goal } = newHabit
  return db('habits')
    .insert({ daysCompleted, goal })
    .then(([id]) => {
      return { id, daysCompleted, goal }
    })
}

// function furture deleteteeee (༼⊚﹏⊚)༽

// function updateHabit(id, updatedHabit, db = connection){
//   return db('habits')
//   .where('id', id)
//   .update(updatedHabit)

// }
function getUsers(db = connection){
  return db('users').select()
}


function getOneUser(id, db = connection){
  return db('users').select().where('id', id).first()
}


function authorizeUser(habit, auth0Id) {
  if(habit.UserID !== auth0Id){
    console.log('errrorroroor with auth')

  }
}
function addUsers(user, db =connection) {

}