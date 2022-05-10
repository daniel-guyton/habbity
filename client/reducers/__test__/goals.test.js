import goalsReducer from '../goals'

const mockData = [
  { id: 6, daysCompleted: 8, goal: 'something' },
  { id: 7, daysCompleted: 8, goal: 'asdsad' },
]
describe('goals reducer', () => {
  it('fetches all the goals', () => {
    const action = {
      type: 'habits/fetch/all',
      payload: [
        { id: 6, daysCompleted: 8, goal: 'something' },
        { id: 7, daysCompleted: 8, goal: 'asdsad' },
      ],
    }

    const inputState = []
    const expectedOutputState = mockData
    const outputState = goalsReducer(inputState, action)

    expect(outputState).toEqual(expectedOutputState)
    expect(outputState[0]).toHaveProperty('goal')
    expect(outputState).not.toBe(inputState)
  })
})
