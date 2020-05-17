import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Page1 from './views/nav1/Page1.vue'
import Page1Admin from './views/nav1/Page1Admin.vue'
import Page2 from './views/nav2/Page2.vue'
import Page2Admin from './views/nav2/Page2Admin.vue'
import Page3 from './views/nav3/Page3.vue'
import Page3Admin from './views/nav3/Page3Admin.vue'
import Page4 from './views/nav4/Page4.vue'

let routes = [
    {
        path: '/',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bar-chart',//图标样式class
        leaf: true,//只有一个节点
        children: [
            { path: '/page1', component: Page1, name: '主页' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-calendar-check-o',
        leaf: true,//只有一个节点
        children: [
            { path: '/page2', component: Page2, name: '我的预约' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '反馈',
        iconCls: 'fa fa-pencil-square-o',
        leaf: true,//只有一个节点
        hidden: true,
        identity:2,
        children: [
            {
                path: '/Page3',
                component: Page3,
                name: '反馈信息'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '个人信息',
        iconCls: 'fa fa-cog',
        leaf: true,//只有一个节点
        children: [
            { path: '/Page4', component: Page4, name: '个人信息' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理员操作',
        iconCls: 'fa fa-star',
        leaf: false,
        hidden: true,
        identity:1,
        children: [
            {
                path: '/Page2Admin',
                component: Page2Admin,
                name: '预约审核',
                meta: {
                    title: "预约审核"
                }
            },
            {
                path: '/Page3Admin',
                component: Page3Admin,
                name: '处理反馈',
                meta: {
                    title: "处理反馈"
                }
            },
            {
                path: '/Page1Admin',
                component: Page1Admin,
                name: '教室资源管理',
                meta: {
                    title: "教室资源管理"
                }
            }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;