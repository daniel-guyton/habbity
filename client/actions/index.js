import * as api from '../apis/apiClient'

export const FETCH_ALL = 'habits/fetch/all'

export const UPDATE_HABIT_STATUS = 'habit/status/update'
export const UPDATE_HABIT = 'habit/update'
export const ADD_GOAL = 'habit/add/new'
export const SET_USER = 'set/user'
export const FETCH_USER = 'users/fetch'
export const SET_PROFILE = 'profile/set'
export const UPDATE_PROFILE = 'profile/update'
export const SET_ERROR = 'status/error'

//* HABITS
// ========

export const createState = (token) => {
  // fancy action that returns a function
  return (dispatch) => {
    return api
      .getHabits(token)
      .then((result) => {
        dispatch(createFetchPayload(result)) // builds payload if successful
      })
      .catch((err) => {
        dispatch(setError(err.message))
        console.log(err)
      })
  }
}

export const fetchProfile = (token) => {
  console.log(token)
  return (dispatch) => {
    return api
      .getUserByAuth0Id(token)
      .then((res) => {
        dispatch(setProfile(res))
      })
      .catch((err) => {
        dispatch(setError(err.message))
      })
  }
}
export const createFetchPayload = (input) => {
  return {
    type: FETCH_ALL,
    payload: input,
  }
}

export const addGoal = (habitObj) => ({
  type: ADD_GOAL,
  payload: { goal: habitObj },
})

export const updateHabit = (updatedHabit) => ({
  type: UPDATE_HABIT,
  payload: { updatedHabit },
})

//* USERS
// =======

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  }
}

export const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: { profile },
})

export const updateProfile = (updatedProfile) => ({
  type: UPDATE_PROFILE,
  payload: { updatedProfile },
})

//* error handler

export const setError = (errMessage) => {
  return {
    type: SET_ERROR,
    errMessage,
  }
}
