import axios from 'axios'
import {config} from '../config'

//http://fsjs14.ide.3wa.io:9500/getOneAdd/+id
//config.api_url + "/getOneAdd/" +id
//`${config.api_url}/getOneAdd/${id}`

//on charge toutes les annonces
export function loadAds(){
    return axios.get('https://mikaelborges-serve.herokuapp.com')
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//on charge une seule annonce
export function loadOneAds(id){
    return axios.get(config.api_url+"/api/v1/ads/"+id)
    .then((res)=>{
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
}
