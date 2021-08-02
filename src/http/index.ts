import axios from 'axios'
// 创建axios实例
const http = axios.create({
    baseURL: 'http://tomotsune.asia:9001', //api的base_url
    timeout: 20000 //超时请求时间
})
export default http