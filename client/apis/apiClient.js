import request from 'superagent'

const rootUrl = '/api/v1'

//*   HABITS
//* ==========

export function getHabits(userId) {
  return request.get(rootUrl + '/habits/' + userId).then((res) => {
    return res.body.habits
  })
}

export function addHabits(newhabits) {
  return request
    .post(rootUrl + '/habits')
    .send({ newhabits })
    .then((res) => {
      return res.body
    })
}

//*   USERS
//* ==========

// export function

// Note: don't need user table, only auth0Id is recorded with every habit saved in the database