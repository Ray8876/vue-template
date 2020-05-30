import axios from 'axios';
import router from '../router';

// 创建 axios 实例
let http = axios.create({
    timeout: 60000,
    withCredentials: true,
})



// 设置 post、put 默认 Content-Type
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
http.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
http.interceptors.request.use(config => {
    console.log("request");
    console.log(config);
    // 请求发送前进行处理
    return config
}, error => {
    // 请求错误处理
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(response => {
    console.log("response");
    console.log(response);

    // hideLoading();
    // console.log('来到了response拦截success中');
    // console.log(response);
    if (response.status === 200) {
        switch (response.data.code) {
            case 601:
                return Promise.reject(response.data.msg);
            case 602:
                return Promise.reject(response.data.msg);
            case 702:
                router.push('/login');
                return Promise.reject(response.data.msg);
            case 701:
                router.push('/login');
                return Promise.reject();
            default:
                return response.data;
        }
    } else {
        return Promise.reject();
    }
}, err => {
    console.log('来到了response拦截failure中');
    console.log(err);
    if (err && err.response) {
        switch (err.response.status) {
            case 500:
                err.message = '服务器出错';
                break;
            case 400:
                err.message = '请求错误';
                break;
            case 401:
                err.message = '未授权的访问';
                break;
            case 404:
                err.message = '请求地址错误';
                // router.replace('/404');
                break;
        }
    }
    return Promise.reject(err);
});

export default http
