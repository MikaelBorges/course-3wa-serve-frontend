import axios from "axios";
import { config } from "../config";
// const token = window.localStorage.getItem("coachme-token");

export const changeImg = (data) => {
    //return axios.post(config.api_url + '/api/v1/coach/updateImg', datas, { headers: { 'x-access-token': token }})
    return axios.post(`${config.api_url}/user/updateImg`, data)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

/* export const getOneCoach = (coach_id) => {
    return axios.get(config.api_url + '/api/v1/coach/one/' + coach_id)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const saveOneCoach= (datas) => {
    return axios.post(config.api_url + '/api/v1/coach/save', datas)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const loginOneCoach = (datas) => {
    return axios.post(config.api_url + '/api/v1/coach/login', datas)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const updateCoach = (datas, id) => {
     return axios.put(config.api_url + '/api/v1/coach/update/'+id, datas, { headers: { 'x-access-token': token }})
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
    
} */
