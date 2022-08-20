import axios from 'axios'
import { config } from '../config'

//on charge toutes les annonces
export function loadAds() {
    return axios.get(config.api_url)
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err
    })
}

/* export function deleteAd(data) {
  console.log('data ads.js', data)
  return axios.post(`${config.api_url}/user/ad/${data.userId}`, data)
  .then(res => {
    console.log('res (newAd.js)', res)
    return res
  })
  .catch(err => {
    console.log('err', err)
    return err
  })
} */

export function newAd(data) {
  console.log('data ads.js', data)
  return axios.post(`${config.api_url}/user/ad/${data.userId}`, data)
  .then(res => {
    console.log('res (newAd.js)', res)
    return res
  })
  .catch(err => {
    console.log('err', err)
    return err
  })
}

//on charge toutes les annonces de l'user
export function loadUserAds(id) {
  return axios.get(`${config.api_url}/user/${id}`)
  .then((res) => {
      //console.log('res ads.js', res)
      return res.data
  })
  .catch((err) => {
      return err
  })
}

//on charge une seule annonce
/* export function loadOneAds(id) {
    return axios.get(config.api_url+"/api/v1/ads/"+id)
    .then((res) => {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//on ajoute une annonce 
export function addOneAds(datas){
    return axios.post(config.api_url+"/api/v1/ads/save", datas)
    .then((res)=>{
        return res.data.status
    })
    .catch((err)=>{
        return err
    })
}

//on modifie une annonce
export function updateOneAds(datas, id){
    return axios.put(config.api_url+"/api/v1/ads/update/"+id, datas)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//on supprime une annonce
export function deleteOneAds(id){
    return axios.delete(config.api_url+"/api/v1/ads/delete/"+id)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
} */

//on supprime une annonce
/* export function deleteAd(userId, adId) {
  return axios.delete(`${config.api_url}/user/${userId}/delete/${adId}`)
  //return axios.delete(config.api_url+"/api/v1/ads/delete/"+id)
  .then((res)=>{
      return res.data
  })
  .catch((err)=>{
      return err
  })
} */
