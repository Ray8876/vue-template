import http from './axios'
import qs from 'qs'

const contextPath = process.env.VUE_APP_CONTEXT_PATH;
let proxyConf = '';  //本地开发走vue server代理，处理跨域问题
if (process.env.VUE_APP_CURRENTMODE === 'dev') {
    proxyConf = '/dev'
}


export default {
    get (url, config) {
        let _url = `${proxyConf}${contextPath}${url}`;
        return http.get(_url, config);
    },
    post (url, params, config) {
        let _url = `${proxyConf}${contextPath}${url}`;
        //默认请求
        if (!config || !config.headers['Content-Type']) {
            return http.post(_url, qs.stringify(params), config)
        }
        //自定义头请求
        if (config.headers['Content-Type'] === 'multipart/form-data') {
            return http.post(_url, params, config)
        }
    }
}