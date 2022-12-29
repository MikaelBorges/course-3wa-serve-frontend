import { combineReducers } from 'redux'
import AdsReducer from './adsReducer'

const rootReducer = combineReducers({
  ads: AdsReducer
})

export default rootReducer
