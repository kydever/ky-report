import Layout from '@/layout/index.vue'

const report = {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    meta: { title: '仪表盘' },
    children: [
        {
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('@/views/common/dashboard.vue'),
            meta: { title: '仪表盘' }
        }
    ]
}

export default report
