import axios from 'axios'
import store from '../store'
// 创建axios实例
const http = axios.create({
    // TODO 暂时改为生产环境
    baseURL: 'http://tomotsune.asia:9001', //api的base_url
    timeout: 20000 //超时请求时间
})

http.interceptors.request.use(
    config => {
        if (window.localStorage.getItem('token')) {
            config.headers['token'] = store.state.token
        }
        return config
    },
    error => Promise.reject(error)
)
export default http