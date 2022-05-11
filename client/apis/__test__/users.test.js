import nock from 'nock'
import {
  addUser,
  getUserByAuth0Id,
  getProfile,
  patchProfile,
} from '../apiClient'

describe('addUser', () => {
  it('returns a new user from POST /api/v1/users', async () => {
    const newUser = { id: 1, name: 'John' }
    expect.assertions(2)
    nock('http://localhost')
      .post('/api/v1/users')
      .reply(201, { ...newUser })

    const { id, name } = await addUser(newUser)

    expect(id).toBe(1)
    expect(name).toBe('John')
  })
})

describe('getUserByAuth0Id', () => {
  it('should return a user by the auth0 token', async () => {
    expect.assertions(3)
    nock('http://localhost')
      .get('/api/v1/users')
      .reply(200, { id: 3, name: 'bobina', points: 302 })

    const { id, name, points } = await getUserByAuth0Id({ token: '' })

    expect(id).toBe(3)
    expect(name).toBe('bobina')
    expect(points).toBe(302)
  })
})

describe('getProfile', () => {
  it('should return a user profile by the token', async () => {
    nock('http://localhost')
      .get('/api/v1/users')
      .reply(200, { id: 3, name: 'bobina', points: 302 })

    const { id, name, points } = await getProfile({ token: '' })

    expect(id).toBe(3)
    expect(name).toBe('bobina')
    expect(points).toBe(302)
  })
})

describe('patchProfile', () => {
  it('should update a user profile', async () => {
    const updatedProfile = { points: 302 }
    nock('http://localhost').patch('/api/v1/users').reply(200, 1)
    const hasUpdatedHabit = await patchProfile(updatedProfile)

    expect(hasUpdatedHabit).toBe(1)
  })
})
