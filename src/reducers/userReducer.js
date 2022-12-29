import { RECOVER_DATA_USER } from '../actions/user/user-types'

const initState = {
  _id : 'Xf234gDFG',
  firstName: 'jean',
  lastName: 'dupont',
  email: "jd@hotmail.fr",
  role: "user",
  imageUser: "https://res.cloudinary.com/mika4ever/image/upload/v1667460780/samples/profils/mikael-b.jpg",
  reviewsNb: 30,
  starsNb: 26,
  superUser: false
}

const UserReducer = (state = initState, action) => {
  console.log('(USER REDUCER) action', action)
  console.log('(USER REDUCER) state', state)
  switch (action.type) {
    case RECOVER_DATA_USER:
      return {
        ...action.payload
      }
    default: return state
  }
}

export default UserReducer
