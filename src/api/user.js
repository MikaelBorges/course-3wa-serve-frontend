import axios from 'axios'
import {config} from '../config'

//http://fsjs14.ide.3wa.io:9500/getOneAdd/+id
//config.api_url + "/getOneAdd/" +id
//`${config.api_url}/getOneAdd/${id}`

export function checkIfDataUserIsAccessible() {
  const ls = window.localStorage.getItem('user')
  console.log('LOCAL STORAGE :')
  console.log(ls)
  return ls
}

//on charge toutes les annonces
export function loginUser(datas) {
  return axios.post('http://localhost:3306/user/login', datas)
  .then((res)=>{
    return res
  })
  .catch((err)=>{
    console.log('err')
    console.log(err)
    return err
  })
}

export function logoutUser(datas) {
  console.log('DATAS LOGOUT')
  console.log(datas)
  console.log('preparation appel de la route')
  return axios.post('http://localhost:3306/user/logout', datas)
  .then((res)=>{
    console.log('RES LOGOUT')
    console.log(res)
    return res
  })
  .catch((err)=>{
    console.log('erreur: rentre dans le catch de user')
    console.log(err)
    return err
  })
}
