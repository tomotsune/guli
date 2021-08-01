import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('../components/Home.vue')
    },
    {
        path: '/home',
        component: () => import('../components/Home.vue'),
        children: [
            {
                path: '/index',
                component: () => import('../components/home/AppIndex.vue')
            }
        ]
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router