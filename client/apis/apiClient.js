import request from 'superagent'

// => switch from local api to heroku url before deploying to heroku
const rootUrl = 'https://habbity.herokuapp.com/api/v1'
// const rootUrl = '/api/v1'

//*   HABITS
//* ==========

export function getHabits() {
  return request.get(rootUrl + '/habits').then((res) => {
    // console.log('api', res.body.habits)
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
