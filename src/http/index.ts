import axios from 'axios'
import store from '../store'
// 创建axios实例
const http = axios.create({
    // TODO 暂时改为生产环境
    baseURL: 'http://localhost:8001', //api的base_url
    timeout: 8000 //超时请求时间
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