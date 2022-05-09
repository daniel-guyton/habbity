import request from 'superagent'

// => switch from local api to heroku url before deploying to heroku
//const rootUrl = 'https://habbity.herokuapp.com/api/v1'
const rootUrl = '/api/v1'

//*   HABITS
//* ==========

export function getHabits(user) {
  return request
    .get(rootUrl + '/habits')
    .auth(user.token, { type: 'bearer' })
    .then((res) => {
      return res.body.habits
    })
}

export function addHabits(newHabit, token) {
  return request
    .post(rootUrl + '/habits')
    .send({ newHabit })
    .set('Accept', 'application/json')
    .auth(token, { type: 'bearer' })
    .then((res) => {
      return res.body
    })
}

export function patchHabit(habitToUpdate, token) {
  return request
    .patch(rootUrl + '/habits')
    .send({ ...habitToUpdate })
    .set('Accept', 'application/json')
    .auth(token, { type: 'bearer' })
    .then((res) => {
      return res.body
    })
}

//*   USERS
//* ==========

export function addUser(user) {
  return request
    .post(rootUrl + '/users')
    .send({ user })
    .auth(user.token, { type: 'bearer' })
    .then((res) => {
      return res.body
    })
}

export function getUserByAuth0Id(user) {
  return request
    .get(rootUrl + '/users')
    .auth(user.token, { type: 'bearer' })
    .then((res) => {
      return res.body
    })
}

//*   BADGES
//* ==========

export function getBadge(user) {
  return request
    .get(rootUrl + '/badges')
    .auth(user.token, { type: 'bearer' })
    .then((res) => {
      return res.body
    })
}