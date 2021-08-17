import axios from 'axios'
import store from '../store'
import router from '../router'
import {ElMessage} from 'element-plus'
// 创建axios实例
const http = axios.create({
    baseURL: 'http://tomotsune.asia:9001', //api的base_url
    //baseURL: 'http://localhost:8001',
    timeout: 20000 //超时请求时间
})

/* 请求拦截器 */
http.interceptors.request.use(
    req => {
        if (window.localStorage.getItem('token')) {
            req.headers['token'] = store.state.token
        }
        return req
    },
    error => Promise.reject(error)
)

/* 响应拦截器 */
http.interceptors.response.use(
    async res => {
        /* 捕获未登录的错误响应 */
        if (res.data.code === 60101||res.data.code === 60102) {
            store.commit('logout')
            await router.replace('/login')
            ElMessage.warning(res.data.msg)
        }
        return res
    }
)
export default http