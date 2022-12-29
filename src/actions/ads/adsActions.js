import { UPDATE } from './actions-types'

export const fetchAds = (ads) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE,
      payload: ads
    })
  }
}
