import {createRouter, createWebHashHistory} from 'vue-router'
import http from '../http'
import store from '../store'
import {ElMessage} from 'element-plus'

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
                path: '/jotter',
                component: () => import('../components/jotter/Articles.vue')
            },
            {
                path: '/admin/content/editor',
                component:()=>import('../components/admin/content/ArticleEditor.vue')
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
        next(store.state.adminMenus[0].children[0].path)
    }
    if (store.state.token && to.path.startsWith('/admin')) {
        await initAdminMenu()
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

/**
 * 初始化后台菜单, 如果store中有格式化后的数据就直接通过 `addRoute`方法在运行时动态加入
 * 如果没有:
 * 1. 就发请求到后台获取树形结构的路由菜单信息
 * 2. 按前端路由要求格式化数据
 * 3. addRoute添加路由
 * 4. 将格式化数据保存到store中
 */
const initAdminMenu = async () => {
    if (store.state.adminMenus.length > 0) {
        store.state.adminMenus.forEach(router.addRoute)
    } else {
        const res = await http.get(`/ucenter/permission/info`)
        if (res.data.code === 20000) {
            ElMessage.success('菜单获取成功')
            const fmtRoutes = formatRoutes(res.data.data)
            fmtRoutes.forEach(router.addRoute)
            store.commit('initAdminMenu', fmtRoutes)
        }else {
            ElMessage.error(res.data.msg)
        }
    }
}
/**
 * 将后端传来的数据递归包装为路由器要求的格式
 * @param routes 格式化路由集合
 */
const formatRoutes = (routes) => {
    let fmtRoutes = []
    routes.forEach(route => {
        if (route.collection) {
            route.collection = formatRoutes(route.collection)
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
            children: route.collection
        }
        fmtRoutes.push(fmtRoute)
    })
    return fmtRoutes
}
export default router