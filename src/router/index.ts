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
                path: '/curriculum',
                component: () => import('../components/curriculum/CurriculumIndex.vue'),
                redirect: '/curriculum/course',
                children: [
                    {
                        path: 'course',
                        component: () => import('../components/curriculum/Courses.vue')
                    },
                    {
                        path: ':id',
                        component: () => import('../components/curriculum/CourseDetails.vue')
                    }
                ]
            },
            {
                path: '/faculty',
                component: () => import('../components/faculty/FacultyIndex.vue'),
                redirect: '/faculty/teacher',
                children: [
                    {
                        path: 'teacher',
                        component: () => import('../components/faculty/Teachers.vue')
                    },
                    {
                        path: ':id',
                        component: () => import('../components/faculty/TeacherDetails.vue')
                    }
                ]
            },
            {
                path: '/admin/content/editor',
                component: () => import('../components/admin/content/ArticleEditor.vue'),
                meta: {requireAuth: true}
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
    },
    {
        path: '/admin',
        component: () => import('../components/admin/AdminIndex.vue'),
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: 'dashboard',
                component: () => import('../components/admin/dashboard/admin/index.vue')
            }
        ]
    },
    {
        path: '/payment/:orderNo',
        component: () => import('../components/pages/Payment.vue'),
        meta: {requireAuth: true}
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../components/pages/Error404.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

router.beforeEach(async (to, from, next) => {
    // 针对第三方登录后携带token跳转回来的情况
    if (from.query.token) { // 拦截所有请求, 捕获token并自动登录
        store.commit('login', from.query.token)
    }
    // 登录状态下访问login页面直接跳转到后台首页
    if (store.state.token && to.path.startsWith('/login')) {
        next('/admin/dashboard')
    }
    if (store.state.token && to.path.startsWith('/admin')) {
        // await initAdminMenu()
    }
    if (to.meta.requireAuth) {
        if (store.state.token) {
            // to.query = {redirect: from.fullPath}
            next()
        } else {
            // 没有凭证
            next({path: '/login', query: Object.assign(from.query, {redirect: to.fullPath})})
        }
    } else next()
})


const initAdminMenu = async ()=>{
    if(store.state.adminMenus.length>0)
        return
    const res = await http.get('/ucenter/member/menu')
    if(res.data.code===20000) {
        const fmtRoutes = formatRoutes(res.data.data())
        fmtRoutes.forEach(router.addRoute)
        store.commit('initAdminMenu',fmtRoutes)
    }
}
// routes: 从服务端获得的数据
const formatRoutes = (routes) => {
    let fmtRoutes = []
    routes.forEach(route => {
        if (route.children) {
            route.children = formatRoutes(route.children)
        }
        let fmtRoute = {
            path: route.path,
            component: () => {
                import('./components/admin/' + route.component + '.vue')
            },
            name: route.name,
            icon: route.icon,
            meta: {
                requireAuth: true
            },
            children: route.children
        }
        fmtRoutes.push(fmtRoute)
    })
    return fmtRoutes
}
export default router