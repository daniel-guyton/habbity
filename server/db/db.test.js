const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./db')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getHabits', () => {
  it('returns the correct habbit', () => {
    return db.getHabits(testDb)
    .then((habits) => {
      expect(habits).toHaveLength(4)
      expect(habits[0].id).toEqual(1)
      return null
    })
  })
})