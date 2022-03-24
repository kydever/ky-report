import { createRouter, createWebHistory } from 'vue-router'
import report from './children/report'
import single from './children/single'

const frameIn = [
    single,
    report
]

const frameOut = [
    {
        path: '/',
        redirect: "/login",
    },
    {
        name: 'login',
        path: '/login',
        meta: { title: '登录' },
        component: () => import('@/views/common/login.vue')
    },
    {
        name: 'not-found',
        path: '/404',
        meta: { title: '404' },
        component: () => import('@/views/common/notFound.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    }
]

const All = [
    ...frameIn, ...frameOut
]

const router = createRouter({
    history: createWebHistory(),
    routes: All
})

export default router
