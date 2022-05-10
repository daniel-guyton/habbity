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
      expect(habits[0].userID).toContain('2')
      return null
    })
  })
})

describe('getOneHabit', () => {
  it('returns a single habit', () => {
    return db.getOneHabit(2, testDb).then((habit) => {
      expect(typeof habit).toBe('object')
      expect(habit.id).toBe(2)
      return null
    })
  })
})

describe('getUsers', () => {
  const fakeAuth0 = '627876170b600f00693e7225'
  it('returns users', () => {
    return db.getUser(fakeAuth0, testDb).then((user) => {
      expect(user.username).toBe('bobina')
      expect(user.email).toBe('green@gmail.com')
      return null
    })
  })
})

describe('addHabit', () => {
  it('adds a habit', () => {
    return db
      .addHabit({ daysCompleted: 3, goal: 'drink water' }, testDb)
      .then((result) => {
        expect(result.goal).toBe('drink water')
      })
  })
})
