import request from 'superagent'

const rootUrl = '/api/v1/habits'

export function getHabits() {
  return request.get(rootUrl + '/habits').then((res) => {
    return res.body.habits
  })
}

export function addHabits(newhabits) {
  return request
    .post(rootUrl + '/habits')
    .send({ newhabits })
    .then((res) => {
      return res.body.habits
    })
}
