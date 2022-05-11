import nock from 'nock'
import { getHabits, addHabits, patchHabit } from '../apiClient'

describe('getHabits', () => {
  it('should return all the habits', async () => {
    nock('http://localhost')
      .get('/api/v1/habits')
      .reply(200, { habits: [{ id: 1, goal: 'something' }] })

    const [{ id, goal }] = await getHabits({ token: '' })

    expect(id).toBe(1)
    expect(goal).toBe('something')
  })
})

describe('addHabits', () => {
  it('returns new habit from POST /api/v1/habits', async () => {
    const newHabit = { goal: 'do something' }
    nock('http://localhost')
      .post('/api/v1/habits')
      .reply(201, { id: 1, ...newHabit })

    const { id, goal } = await addHabits(newHabit, { token: '' })

    expect(id).toBe(1)
    expect(goal).toBe('do something')
  })
})

describe('patchHabit', () => {
  it('returns updated habit from PATCH /api/v1/habits', async () => {
    expect.assertions(1)
    const updatedHabit = { id: 1, status: 'completed', daysCompleted: 1 }
    nock('http://localhost').patch('/api/v1/habits').reply(204, 1)

    const hasUpdatedHabit = await patchHabit(updatedHabit)

    expect(hasUpdatedHabit).toBe(1)
  })
})
