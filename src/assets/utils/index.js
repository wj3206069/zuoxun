import axios from 'axios'
import qs from 'qs'
import config from '../config'


const configHttp = function(instance) {
    instance.interceptors.request.use(
        config => {
            let authToken =  sessionStorage.getItem('access_token');
	        if (authToken != null) {
	        	config.headers.Authorization = `Bearer ` + authToken
	        }
	        return config
	    },
	    err => {
	        return Promise.reject(err)
	    }
    )
    
    instance.interceptors.response.use(
        response => {
            return response.data
        },
        error => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        let config = error.config;
                        if (!config.isRetryRequest) {
                        	 let authToken =  sessionStorage.getItem('refresh_token');
                        	 if(authToken==null)
                        	 {
                        		 sessionStorage.removeItem('access_token');
                                 sessionStorage.removeItem('refresh_token');
                                 sessionStorage.removeItem('user');
                                 window.location.href = window.location.protocol + "//" + window.location.host + GLOBAL_CONFIG.baseURL;
                        	 }
                        	 else
                        	 {
                        		  return getRefreshToken(instance)
                                  .then(function (res) {
                                      let data = res.data;
                                      sessionStorage.setItem('access_token', data.access_token);
                                      sessionStorage.setItem('refresh_token', data.refresh_token);
                                      config.isRetryRequest = true;
                                      let authToken = data.access_token;
                                      config.headers.Authorization = `Bearer ` + authToken;
                                      GLOBAL_CONFIG = Object.assign(GLOBAL_CONFIG, config);
                                      return axios(GLOBAL_CONFIG);
                                  })
                                  .catch( (err) =>{
                                      sessionStorage.removeItem('access_token');
                                      sessionStorage.removeItem('refresh_token');
                                      sessionStorage.removeItem('user');
                                      //this.$message.error("token过期，点击确认重新登录！");
                                      this.$message.error(err)
                                      console.log(err)
                                      window.location.href = window.location.protocol + "//" + window.location.host + GLOBAL_CONFIG.baseURL; 
                                  })
                        	 }                          
                        }
                        break;
                }
            }
            return Promise.reject(error)
        }
    )
    return instance;
}

let GLOBAL_CONFIG = {
    proxyPath: config.proxyPath
};

const getRefreshToken = function(instance) {
    sessionStorage.removeItem('access_token');
    let authToken =  sessionStorage.getItem('refresh_token');
    let proxyPath = GLOBAL_CONFIG.proxyPath;
    return instance.post(`${proxyPath}/api/oauth/refreshtoken/${authToken}`, {});
}

const getHttpInstance = function(config) {
    
    config = config ? config : {};
    let cfg = Object.assign({
        isRetryRequest: false,
        headers: {
            'Content-Type': 'application/json'
        },
        baseURL: '/'
    }, config);
    GLOBAL_CONFIG = Object.assign({}, cfg);
    let instance = axios.create(cfg);
    configHttp(instance);
    return instance;
}

export const getQueryString = function(name) {
    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) {
        return unescape(r[2]);
    }
    return null
}

export default getHttpInstance