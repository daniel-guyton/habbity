import nock from 'nock'
import { addUser } from '../apiClient'

describe('addUser', () => {
  it('returns a new user from POST /api/v1/users', async () => {
    const newUser = { id: 1, name: 'John' }
    nock('http://localhost')
      .post('/api/v1/users')
      .reply(201, { ...newUser })

    const { id, name } = await addUser(newUser)

    expect(id).toBe(1)
    expect(name).toBe('John')
  })
})
