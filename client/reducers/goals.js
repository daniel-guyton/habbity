import { FETCH_ALL, UPDATE_HABIT_STATUS, UPDATE_TIMESTAMP, ADD_GOAL } from '../actions'

const initialState = [
  {
    goal: 'Go to sleep',
    status: 'progress',
    timestamp: 1651942639000,
    days: 2,
    goalCompletedAt: 1651942639000,
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

//*   REDUCER
//* ===========

const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    case UPDATE_HABIT_STATUS: {
      const goals = [...state]
      const updatedArray = goals.map((habit, i) => {
        if (habit.goal === action.payload.goal) {
          return {
            ...habit,
            status: action.payload.status,
          }
        } else return habit
      })
      return updatedArray
    }
    case ADD_GOAL: {
      return [...state, action.payload.goal]
    }
    case UPDATE_TIMESTAMP: {
      const goals = [...state]

      const goalIndex = goals.findIndex(
        (habit) => habit.goal === action.payload.updatedGoal.goal
      )

      if (goalIndex < 0) {
        return goals
      }

      goals.splice(goalIndex, 1, {
        ...goals[goalIndex],
        ...action.payload.updatedGoal,
      })
      return goals
    }
    default:
      return state
  }
}

export default goalsReducer
