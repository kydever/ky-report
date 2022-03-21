import Layout from '@/layout/index.vue'

const report = {
    path: '/report',
    component: Layout,
    redirect: '/report/list',
    meta: { title: "日报管理" },
    children: [
        {
            path: 'list',
            name: 'report-list',
            component: () => import('@/views/report/list/index.vue'),
            meta: { title: '日报列表' }
        }
    ]
}

export default report
