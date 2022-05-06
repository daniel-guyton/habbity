export const UPDATE_STATUS = 'goals/update'
export const ADD_GOAL = 'goals/add'
export const UPDATE_GOAL = 'goals/update'

export const updateStatus = (goal, status) => ({
  type: UPDATE_STATUS,
  payload: { status, goal },
})

export const addGoal = (goal) => ({
  type: ADD_GOAL,
  payload: { goal },
})

export const updateGoal = (updatedGoal) => ({
  type: UPDATE_GOAL,
  payload: { updatedGoal },
})
