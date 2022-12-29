import { UPDATE } from '../actions/ads/actions-types'

const initState = {
  fetchedAds : []
}

const AdsReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        fetchedAds: [
          ...state.fetchedAds,
          ...action.payload
        ]
      }
    default: return state
  }
}

/* const AdsReducer = (state = initState, action) => {
  console.log('(ADS REDUCER) action', action)
  console.log('(ADS REDUCER) state', state)
  switch (action.type) {
    case UPDATE:
      return [
        ...state,
        ...action.payload
      ]
    default: return state
  }
} */

export default AdsReducer
