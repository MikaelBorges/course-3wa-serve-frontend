export const userIsLogout = dataUser => {
  if(Object.keys(dataUser).length === 0 && dataUser.constructor === Object) return true
}

export const userIsLogged = dataUser => {
  if(Object.keys(dataUser).length > 0) return true
}