import nock from 'nock'
import { getBadge, updateBadgeByUser } from '../apiClient'

describe('getBadge', () => {
  it('should return a badge', async () => {
    nock('http://localhost').get('/api/v1/badges').reply(200, {
      type: 'gif',
      id: 'xT9DPGsywQ5zMfR6KY',
      url: 'https://giphy.com/gifs/life-penguin-motivational-xT9DPGsywQ5zMfR6K',
    })

    const { type, id, url } = await getBadge({ token: '' })

    expect(type).toBe('gif')
    expect(id).toBe('xT9DPGsywQ5zMfR6KY')
    expect(url).toContain('https://')
  })
})

describe('updateBadgeByUser', () => {
  it('should update badge by user', async () => {
    nock('http://localhost')
      .patch('/api/v1/users/badges')
      .reply(204, { id: 1, badges: ['first badge'] })

    const { id, badges } = await updateBadgeByUser({
      token: '',
      id: 1,
      badges: ['first badge'],
    })

    expect(badges[0]).toBe('first badge')
    expect(id).toBe(1)
  })
})
