import { configureStore, combineReducers } from '@reduxjs/toolkit'

import goals from './reducers/goals'
import user from './reducers/user'
import profile from './reducers/profiles'

const rootReducer = combineReducers({
  goals,
  user,
  profile,
})

const store = configureStore({ reducer: rootReducer })

export default store
