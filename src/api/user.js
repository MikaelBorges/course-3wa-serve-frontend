import axios from 'axios'
import { config } from '../config'

/* export function getLiteInfosWithId(id) {
  return axios.get(`${config.api_url}/user/${id}`)
  .then(res => {
      return res.data
  })
  .catch(err => {
      return err
  })
} */

export function addToFavorites(ad) {
  return axios.post(`${config.api_url}/addToFavorites`, ad)
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })
}

export function registerUser(datas) {
  return axios.post(`${config.api_url}/user/register`, datas)
  .then(res => {
    //console.log('res (user.js)', res)
    return res
  })
  .catch(err => {
    console.log('err', err)
    return err
  })
}

//on charge toutes les annonces
export function loginUser(datas) {
  return axios.post(`${config.api_url}/user/login`, datas)
  .then(res => {
    return res
  })
  .catch(err => {
    console.log('err: rentré dans le catch user.js')
    console.log(err)
    return err
  })
}

export function logoutUser(datas) {
  /* console.log('DATAS LOGOUT')
  console.log(datas)
  console.log('preparation appel de la route') */
  return axios.post(`${config.api_url}/user/logout`, datas)
  .then(res => {
    /* console.log('RES LOGOUT')
    console.log(res) */
    return res
  })
  .catch(err => {
    console.log('erreur: rentre dans le catch de user')
    console.log(err)
    return err
  })
}
