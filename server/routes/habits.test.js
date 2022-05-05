const request = require('supertest')
const server = require('../server')
const {getHabits, getOneHabit, addHabits} = require('../db/db')

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
      expect(res.body.habits).toHaveLength(2)
      expect(res.body.habits[1].goal).toBe('raise a fish to be a lawyer')
      return null
    })

  })
  it('returns an error when status 500', () => {
    expect.assertions(2)
    getHabits.mockImplementation(() => Promise.reject(new Error('Failed to fetch habits TT_TT')))
      return request(server)
      .get('/api/v1/habits')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Failed to fetch habits TT_TT')
      })
    })
    
})


describe('POST /api/v1/habits', () => {
  it('saves habit to database and returns new habit',()  => {
    const newHabit = { userID: 1, daysCompleted: 0, goal: 'raise a fish to be a lawyer' }
    addHabits.mockReturnValue(Promise.resolve(newHabit))
    // getHabits.mockReturnValue(Promise.resolve({ id: 23, ...newHabit }))
    // expect.assertions(4)
    return request(server)
      .post('/api/v1/habits')
      .send(newHabit)
      .then((res) => {
        
        expect(res.status).toBe(200)
        expect(addHabits).toHaveBeenCalledWith(newHabit)
        expect(res.body.habits).toEqual(newHabit)
        expect(res.body.habits.daysCompleted).toEqual(0)
        // expect(getHabits).toHaveBeenCalledWith(23)
        // expect(res.body).toEqual({ id: 23, ...newHabit })
      })
  })
 
})