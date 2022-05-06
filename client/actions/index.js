export const UPDATE_STATUS = 'status/update'
export const ADD_GOAL = 'status/add'
export const SET_USER = 'SET_USER'

export const updateStatus = (goal, status) => ({
  type: UPDATE_STATUS,
  payload: { status, goal },
})

export const addGoal = (goal) => ({
  type: ADD_GOAL,
  payload: { goal },
})

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  }
}