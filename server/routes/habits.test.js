const request = require('supertest')
const server = request('../server')
const {getHabits, getOneHabit} = require('../db/db')

jest.mock('../db/db')

describe('GET /api/v1/habits', () => {
  it('returns all habits', () => {
    // expect.assertions(3)
    getHabits.mockReturnValue(
      Promise.resolve([
        {
          'id': 2,
          'userID': 3,
          'daysCompleted': 4,
          'goal': 'create a billion dollar company'

        },
        {
          'id': 4,
          'userID': 2,
          'daysCompleted': 0,
          'goal': 'raise a fish to be a lawyer'

        }
      ])
    )
    return request(server)
    .get('/api/v1/habits') 
    .then((res) => {
      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(2)
      expect(res.body[1].goal).toBe('raise a fish to be a lawyer')
      return null
    })

  })
  it('returns an error when status 500', () => {
    // expect.assertions(2)
    getHabits.mockImplementation(() => Promise.reject(new Error('sadness')))
      return request(server)
      .get('/api/v1/habits')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('sadness')
      })
    })
    
})