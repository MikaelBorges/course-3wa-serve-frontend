import axios from 'axios'
import {config} from '../config'

//http://fsjs14.ide.3wa.io:9500/getOneAdd/+id
//config.api_url + "/getOneAdd/" +id
//`${config.api_url}/getOneAdd/${id}`

//on charge toutes les annonces
export function loginUser(datas){
    //console.log('datas front', datas)
    return axios.post('http://localhost:3306/user/login', datas)
    .then((res)=>{
        //console.log('res', res)
        return res
    })
    .catch((err)=>{
        console.log('err', err)
        return err
    })
}
