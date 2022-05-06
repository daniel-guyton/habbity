
import * as api from '../apis/apiClient'

export const FETCH_ALL = 'status/fetch'
export const UPDATE_STATUS = 'status/update'
export const ADD_GOAL = 'status/add'
export const SET_ERROR = 'status/error'

export const createState = () => {
  // fancy action that returns a function
  return (dispatch) => {
    return api.getHabits()
      .then((result) => {
        dispatch(createFetchPayload(res)) // builds payload if successful
      })
      .catch(err => {
        dispatch(setError(err.message))
        console.log(err)
      })
  }
}

export const createFetchPayload = (input) => {
  return {
    type: FETCH_ALL,
    payload: input,
  }
}

export const updateStatus = (goal, status) => ({
  type: UPDATE_STATUS,
  payload: { status, goal },
})

export const addGoal = (goal) => ({
  type: ADD_GOAL,
  payload: { goal },
})

//* error handler

export const setError = (errMsg) => {
  return {
    type: SET_ERROR,
    errMsg,
  }
}
