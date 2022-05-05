import { ADD_GOAL, UPDATE_STATUS } from '../actions'

const initialState = [
  {
    goal: 'Go to sleep',
    status: 'progress',
    timestamp: 1651942639000,
    days: 2,
  },
  {
    goal: 'Wake up earlier',
    status: 'failed',
    timestamp: 1651371062000,
    days: 6,
  },
  {
    goal: 'Walk dogs',
    status: 'progress',
    timestamp: 1651198262000,
    days: 3,
  },
  {
    goal: 'Workout',
    status: 'completed',
    timestamp: 1651198262000,
    days: 28,
  },
]
const goals = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATUS: {
      const goals = [...state]
      const updatedArray = goals.map((goal, i) => {
        if (goal.goal === action.payload.goal) {
          return {
            ...goal,
            status: action.payload.status,
          }
        } else return goal
      })
      return updatedArray
    }
    case ADD_GOAL: {
      return [...state, action.payload.goal]
    }
    default:
      return state
  }
}

export default goals
