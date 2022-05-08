const request = require('supertest')
const server = require('../server')
const { getHabits, getOneHabit, addHabit } = require('../db/db')
const { authCheck } = require('../authCheck')

jest.mock('../db/db')
jest.mock('../authCheck')

beforeAll(() => {
  authCheck.mockImplementation((req, res, next) => {
    req.auth = {
      sub: 'test|62750d593401c3006704d09c',
    }
    next()
  })
  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('GET /api/v1/habits', () => {})
  it('returns all habits', () => {
    // expect.assertions(3)
    getHabits.mockReturnValue(
      Promise.resolve([
        {
          id: 2,
          userID: 3,
          daysCompleted: 4,
          goal: 'create a billion dollar company',
        },
        {
          id: 4,
          userID: 2,
          daysCompleted: 0,
          goal: 'raise a fish to be a lawyer',
        },
      ])
    )
    return request(server)
      .get('/api/v1/habits')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.habits).toHaveLength(2)
        expect(res.body.habits[1].goal).toBe('raise a fish to be a lawyer')
        return null
      })
  })
  it('returns an error when status 500', () => {
    expect.assertions(2)
    getHabits.mockImplementation(() =>
      Promise.reject(new Error('Failed to fetch habits TT_TT'))
    )
    return request(server)
      .get('/api/v1/habits')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Failed to fetch habits TT_TT')
      })
  })
})

describe('POST /api/v1/habits', () => {
  it('saves habit to database and returns new habit', () => {
    const newHabit = {
      daysCompleted: 0,
      goal: 'raise a fish to be a lawyer',
    }
    addHabit.mockReturnValue(Promise.resolve(newHabit))
    // getHabits.mockReturnValue(Promise.resolve({ id: 23, ...newHabit }))
    // expect.assertions(4)
    return request(server)
      .post('/api/v1/habits')
      .send({ newHabit })
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.goal).toEqual(newHabit.goal)
        expect(res.body.daysCompleted).toEqual(newHabit.daysCompleted)
        // expect(getHabits).toHaveBeenCalledWith(23)
        // expect(res.body).toEqual({ id: 23, ...newHabit })
      })
  })
})
