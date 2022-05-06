
import * as api from '../apis/apiClient'

export const FETCH_ALL = 'habits/fetch/all'

export const UPDATE_HABIT_STATUS = 'habit/status/update'
export const UPDATE_TIMESTAMP = 'habit/time/update'
export const ADD_GOAL = 'habit/add/new'

export const SET_ERROR = 'status/error'


//* HABITS
// ========

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

export const updateStatus = (habitObj, statusStr) => ({
  type: UPDATE_HABIT_STATUS,
  payload: { statusStr, habitObj },
})

export const addGoal = (habitObj) => ({
  type: ADD_GOAL,
  payload: { habitObj },
})


export const updateGoal = (inputObj) => ({
  type: UPDATE_TIMESTAMP,
  payload: { inputObj },
})

//* USERS
// =======




//* error handler

export const setError = (errMessage) => {
  return {
    type: SET_ERROR,
    errMessage,
  }
}