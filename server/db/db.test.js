const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./db')

beforeAll(() => {
  return testDb.migrate.latest().then(() => {
    return testDb.seed.run()
  })
})

afterAll(() => {
  return testDb.destroy()
})

describe('getHabits', () => {
  it('returns the correct habbit', () => {
    return db.getHabits(2, testDb).then((habits) => {
      expect(habits).toHaveLength(3)
      expect(habits[0].userID).toEqual(2)
      return null
    })
  })
})

describe('getOneHabit', () => {
  it('returns a single habit', () => {
    return db.getOneHabit(2, testDb).then((habit) => {
      expect(typeof habit).toBe('object')
      expect(habit.id).toEqual(2)
      return null
    })
  })
})

describe('getUsers', () => {
  it('returns users', () => {
    return db.getUsers(testDb).then((users) => {
      expect(users).toHaveLength(4)
      expect(users[0].id).toEqual(1)
      expect(users[1].id).toEqual(2)
      return null
    })
  })
})

describe('addHabit', () => {
  it('adds a habit', () => {
    return db
      .addHabit({ daysCompleted: 3, goal: 'drink water' }, testDb)
      .then((result) => {
        expect(result.goal).toEqual('drink water')
      })
  })
})
