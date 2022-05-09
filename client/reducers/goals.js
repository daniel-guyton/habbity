import {
  FETCH_ALL,
  UPDATE_HABIT_STATUS,
  UPDATE_GOAL,
  ADD_HABIT,
} from '../actions'

const initialState = []

//*   REDUCER
//* ===========

const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    case UPDATE_HABIT_STATUS: {
      const goals = [...state]
      const updatedArray = goals.map((element) => {
        if (element.goal === action.payload.goal) {
          return {
            ...element,
            status: action.payload.status,
          }
        } else return element
      })
      return updatedArray
    }
    case ADD_HABIT: {
      return [...state, action.payload.goal]
    }
    case UPDATE_GOAL: {
      const goals = [...state]

      const goalIndex = goals.findIndex(
        (habit) => habit.id === action.payload.updatedGoal.id
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
