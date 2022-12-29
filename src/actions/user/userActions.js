import { RECOVER_DATA_USER } from './user-types'

export const fetchUser = (user) => {
  return function(dispatch) {
    dispatch({
      type: RECOVER_DATA_USER,
      payload: user
    })
  }
}
