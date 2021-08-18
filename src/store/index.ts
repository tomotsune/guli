import {createStore} from 'vuex'
import router from '../router'

const store = createStore({
    state: {
        token: window.localStorage.getItem('token') == null ?
            '' : window.localStorage.getItem('token' || '[]'),
        adminMenus: []
    },
    actions: {},
    mutations: {
        initAdminMenu(state, value) {
            state.adminMenus = value
        },
        login(state, value) {
            /* 先设置localstorage,  */
            window.localStorage.setItem('token', value)
            state.token = value
        },
        logout(state) {
            // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
            window.localStorage.removeItem('token')
            state.token = ''
            state.adminMenus = []
            router.replace('/index')
        }
    }

})
export default store