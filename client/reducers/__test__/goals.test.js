import goalsReducer from '../goals'
import { FETCH_ALL, UPDATE_HABIT, ADD_GOAL } from '../../actions'

const mockData = [
  { id: 6, daysCompleted: 8, goal: 'something' },
  { id: 7, daysCompleted: 8, goal: 'asdsad' },
]
const fakeGoal = { goal: 'test add goal', daysCompleted: 0}
describe('goals reducer', () => {
  it('fetches all the goals', () => {
    const action = {
      type: FETCH_ALL,
      payload: mockData,
    }

    const inputState = []
    const expectedOutputState = mockData
    const outputState = goalsReducer(inputState, action)

    expect(outputState).toEqual(expectedOutputState)
    expect(outputState[0]).toHaveProperty('goal')
    expect(outputState).not.toBe(inputState)
  })
  it('add goal to the state', () => {
    const action = {
      type: ADD_GOAL,
      payload: { goal: fakeGoal }
    }

    const expected = [...mockData, fakeGoal]
    const actual = goalsReducer(mockData, action)

    expect(actual).toEqual(expected)
    expect(actual).toHaveLength(3)
  })
  it('update habit if id matches exist goal', () => {
    const updatedHabit = { id: 6, goal: 'update goal', daysCompleted: 2 }

    const action = {
      type: UPDATE_HABIT,
      payload: {updatedHabit}
    }

    const expected = [ updatedHabit, mockData[1]]
    const actual = goalsReducer(mockData, action)

    expect(actual).toEqual(expected)
    expect(actual).toHaveLength(2)
  })
  it('does not update habit if id does not match', () => {
    const updatedHabit = { id: 9 }
    
    const action = {
      type: UPDATE_HABIT,
      payload: {updatedHabit}
    }

    const expected = mockData
    const actual = goalsReducer(mockData, action)

    expect(actual).toHaveLength(2)
    expect(actual).toEqual(expected)
  })
  it('returns the initial state when nothing is passed through', () => {
    const action = {
      type: 'test',
      payload: ''
    }

    const expected = mockData
    const actual = goalsReducer(mockData, action)

    expect(actual).toHaveLength(2)
    expect(actual).toEqual(expected)
  })
})
