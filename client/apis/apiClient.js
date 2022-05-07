import request from 'superagent'

const rootUrl = '/api/v1'

//*   HABITS
//* ==========

export function getHabits(user) {
  return request
    .get(rootUrl + '/habits')
    .set('authorization', `Bearer ${user.token}`)
    .send({ user })
    .then((res) => {
      return res.body.habits
    })
}

export function addHabits(newhabits, token) {
  return request
    .post(rootUrl + '/habits')
    .set('authorization:', `Bearer ${token}`)
    .send({ newhabits })
    .then((res) => {
      return res.body
    })
}

//*   USERS
//* ==========

// export function

// Note: don't need user table, only auth0Id is recorded with every habit saved in the database