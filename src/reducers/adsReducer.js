import { UPDATE } from '../actions/ads/actions-types'

/* const initState = [
  {
    _id: '1',
    title: 'titre',
    description: 'description'
  }
] */

const initState = {
  fetchedAds : [
    {
      _id: '1',
      title: 'titre',
      description: 'description'
    }
  ]
}

const AdsReducer = (state = initState, action) => {
  console.log('(ADS REDUCER) action', action)
  console.log('(ADS REDUCER) state', state)
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