import {createRouter, createWebHashHistory} from 'vue-router'
import http from '../http'
import store from '../store'

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('../components/Home.vue')
    },
    {
        path: '/home',
        component: () => import('../components/Home.vue'),
        redirect: '/index',
        children: [
            {
                path: '/index',
                component: () => import('../components/home/AppIndex.vue')
            },
            {
                path: '/course',
                component: () => import('../components/course/CourseIndex.vue')
            },
            {
                path: '/teacher',
                component: () => import('../components/teacher/TeacherIndex.vue')
            },
            {
                path: '/admin',
                component: () => import('../components/admin/user/UserProfile.vue'),
                meta: {requireAuth: true},
            }
        ]
    },
    {
        path: '/login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/register',
        component: () => import('../components/Register.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

router.beforeEach(async (to, from, next) => {
    if (from.query.token) { // 拦截所有请求, 捕获token并自动登录
        store.commit('login', from.query.token)
    }
    if (to.meta.requireAuth) {
        if (store.state.token) {
            to.query = {redirect: from.fullPath}
            next()
        } else {
            next({path: '/login', query: Object.assign(from.query, {redirect: to.fullPath})})
        }
    } else next()
})


// const formatRoutes = (routes) => {
//     let fmtRoutes = []
//     routes.forEach(route => {
//         if (route.children) {
//             route.children = formatRoutes(route.children)
//         }
//
//         let fmtRoute = {
//             path: route.path,
//             component: resolve => {
//                 require(['./components/admin/' + route.component + '.vue'], resolve)
//             },
//             name: route.name,
//             nameZh: route.nameZh,
//             iconCls: route.iconCls,
//             meta: {
//                 requireAuth: true
//             },
//             children: route.children
//         }
//         fmtRoutes.push(fmtRoute)
//     })
//     return fmtRoutes
// }


export default router