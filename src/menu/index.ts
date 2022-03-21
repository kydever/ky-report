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
        name: '日报管理',
        path: '/report',
        icon: 'document',
        children: [
            {
                name: '日报列表',
                path: '/report/list',
            },
            {
                name: '2报列表',
                path: '/report/create',
            }
        ]
    },
    {
        name: '月报管理',
        path: '/report1',
        icon: 'document',
    }
]

export default menus
