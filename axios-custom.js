import axios from 'axios';
import jwt_decode from "jwt-decode";

const customIns = axios.create();

customIns.interceptors.request.use(async function(config){
    if (config?.headers?.Authorization) {
        const accessToken = config.headers.Authorization.replace('Bearer ');
        const accessToken_new = await refreshToken(accessToken)
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken_new}`
        }
    }
    return config
});

function refreshToken(accessToken){
    const current_timestemp = new Date().valueOf() //เวลาปัจจุบัน
    const jwt_decode_resp = jwt_decode(accessToken);
    const exp_refresh_token = jwt_decode_resp.exp;
    if(current_timestemp > exp_refresh_token){
        //call api for generating new access token.
        const api = "Access_token_new"
        return api;
    }

    return false;
}


customIns.interceptors.response.use(function (response) {
    return response;
  }, function (error) {

    return Promise.reject(error);
  });
  
export default customIns;