import {createStore} from 'vuex'

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
            state.token = value
            window.localStorage.setItem('token', value)
        },
        logout(state) {
            // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
            state.token = ''
            window.localStorage.removeItem('token')
            // state.adminMenus = []
        }
    }

})
export default store