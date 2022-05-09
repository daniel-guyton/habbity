import { configureStore } from '@reduxjs/toolkit'

import goals from './reducers/goals'
import user from './reducers/user'

const reducers = {
  goals,
  user,
}

const store = configureStore({ reducer: reducers })

export default store
