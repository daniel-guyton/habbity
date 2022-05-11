const request = require('supertest')
const server = require('../server')
const db = require('../db/db')

// import { objUser } from '../../__mockdata__/mockUserData'
// import { authCheck } from '../authCheck'
const { authCheck } = require('../authCheck')
const { objUser } = require('../../__mockdata__/mockUserData')

jest.mock('../db/db')
jest.mock('../authCheck')

beforeEach(() => {
  jest.clearAllMocks()
})

// describe('here', () => {
//   it('there', () => {
//     return request(server)
//       .get('/api/v1/users')
//       .then((res) => {
//         console.log(res.body)
//       })
//   })
// })

describe('GET /api/v1/users', () => {
  it('returns a single user and email from db', () => {
    expect.assertions(2)
    db.getUser.mockReturnValue(Promise.resolve(objUser.tom))
    authCheck.mockImplementation((req, res, next) => {
      req.auth = {
        sub: 'auth0 | 1234',
        verfied: true,
      }
      next()
    })
    const req = { auth: { sub: 'auth0 | 1234' } }
    const res = {}
    return request(server)
      .get('/api/v1/users')
      .then((res) => {
        console.log('res.body', res.body)
        expect(res.status).toBe(200)
        expect(res.body.username).toEqual('tom')
      })
  })
})
