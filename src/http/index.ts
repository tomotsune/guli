import axios from 'axios'
// 创建axios实例
const http = axios.create({
    // TODO 暂时改为生产环境
    baseURL: 'http://localhost:8161', //api的base_url
    timeout: 2000 //超时请求时间
})

http.interceptors.request.use(
    config => {
        if (window.localStorage.getItem('token')) {
            config.headers['token'] = window.localStorage.getItem('token')
        }
        return config
    },
    error => Promise.reject(error)
)
export default http