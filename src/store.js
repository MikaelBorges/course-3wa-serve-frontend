import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk)),
      store = createStore(rootReducer, {}, composedEnhancer)

export default store