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
                component: () => import('../components/jotter/JotterIndex.vue'),
                redirect: '/jotter/article',
                children: [
                    {
                      path:'article',
                      component: ()=>import('../components/jotter/Articles.vue')
                    },
                    {
                        path: ':id',
                        component: () => import('../components/jotter/ArticleDetails.vue')
                    }
                ]
            },
            {
                path: '/admin/content/editor',
                component:()=>import('../components/admin/content/ArticleEditor.vue'),
                meta: {
                    requireAuth: true
                }
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
    // ??????????????????????????????token?????????????????????
    if (from.query.token) { // ??????????????????, ??????token???????????????
        store.commit('login', from.query.token)
    }
    // ?????????????????????login?????????????????????????????????
    if (store.state.token && to.path.startsWith('/login')) {
        console.log(store.state.adminMenus)
        // ???init???????????????????????????
        //next(store.state.adminMenus[0].children[0].path)
        next('/admin')
    }
    if (store.state.token && to.path.startsWith('/admin')) {
        await initAdminMenu()
    }
    /* ?????????initAdminMenu?????????????????????????????????????????????????????? */
    if (store.state.token && to.path.endsWith('/admin')) {
        next(store.state.adminMenus[0].children[0].path)
    }
    if (to.meta.requireAuth) {
        if (store.state.token) {
            // to.query = {redirect: from.fullPath}
            next()
        } else {
            // ????????????
            next({path: '/login', query: Object.assign(from.query, {redirect: to.fullPath})})
        }
    } else next()
})

/**
 * ?????????????????????, ??????store?????????????????????????????????????????? `addRoute`??????????????????????????????
 * ????????????:
 * 1. ????????????????????????????????????????????????????????????
 * 2. ????????????????????????????????????
 * 3. addRoute????????????
 * 4. ???????????????????????????store???
 */
const initAdminMenu = async () => {
    if (store.state.adminMenus.length > 0) {
        store.state.adminMenus.forEach(router.addRoute)
    } else {
        const res = await http.get(`/ucenter/permission/info`)
        if (res.data.code === 20000) {
            const fmtRoutes = formatRoutes(res.data.data)
            fmtRoutes.forEach(router.addRoute)
            store.commit('initAdminMenu', fmtRoutes)
        }else {
            ElMessage.error(res.data.msg)
        }
    }
}
/**
 * ???????????????????????????????????????????????????????????????
 * @param routes ?????????????????????
 */
const modules = import.meta.glob('../components/admin/**/**.vue')
const formatRoutes = (routes) => {
    let fmtRoutes = []

    routes.forEach(route => {
        if (route.collection) {
            route.collection = formatRoutes(route.collection)
        }
        let fmtRoute = {
            path: route.path,
            component:modules[/* @vite-ignore */`../components/admin/${route.component}.vue`],
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