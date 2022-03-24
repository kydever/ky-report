interface menuInterface {
    name: string
    path: string
    icon?: string
    children?: Array<{
        name: string
        path: string
        icon?: string
    }>
}

const menus: menuInterface[] = [
    {
        name: '仪表盘',
        path: '/dashboard',
        icon: 'document',
    },
    {
        name: '日报管理',
        path: '/report',
        icon: 'document',
        children: [
            {
                name: '日报列表',
                path: '/report/list',
            }
        ]
    }
]

export default menus
