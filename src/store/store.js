import { createStore, combineReducers, compose } from 'redux'
import { userReducer } from './user.reducer.js'

const rootReducer = combineReducers({
  userModule:userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())