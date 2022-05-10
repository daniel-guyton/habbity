import { FETCH_ALL, UPDATE_HABIT, ADD_GOAL } from '../actions'

const initialState = []

//*   REDUCER
//* ===========

const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    case ADD_GOAL: {
      return [...state, action.payload.goal]
    }
    case UPDATE_HABIT: {
      const goals = [...state]

      const goalIndex = goals.findIndex(
        (habit) => habit.id === action.payload.updatedHabit.id
      )

      if (goalIndex < 0) {
        return goals
      }

      goals.splice(goalIndex, 1, {
        ...goals[goalIndex],
        ...action.payload.updatedHabit,
      })
      return goals
    }
    default:
      return state
  }
}

export default goalsReducer
