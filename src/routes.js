import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
// import Main from './views/Main.vue'
import Page1 from './views/nav1/Page1.vue'
import Page1Admin from './views/nav1/Page1Admin.vue'
import Page2 from './views/nav2/Page2.vue'
import Page2Admin from './views/nav2/Page2Admin.vue'
import Page3 from './views/nav3/Page3.vue'
import Page3Admin from './views/nav3/Page3Admin.vue'
import Page4 from './views/nav4/Page4.vue'
import echarts from './views/charts/echarts.vue'

/*export const constantRouterMap= [
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
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-cog',//图标样式class
        leaf: true,//只有一个节点
        children: [
            { path: '/page1', component: Page1, name: '查询' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-calendar-check-o',
        leaf: true,//只有一个节点
        children: [
            { path: '/page2', component: Page2, name: '预约列表' },
        ]
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    }
];

export default new Router({
    routes: constantRouterMap
  });


  export const asyncRouterMap = [
    {
        path: '/',
        component: Home,
        name: '',
        meta: { role: 1 }, //页面需要的权限
        iconCls: 'fa fa-search',
        leaf: true,//只有一个节点
        children: [
            {
                path: '/page3',
                component: Page3,
                name: '预约审核',
                meta: {
                    title: "预约审核",
                    role: 1
                }
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '反馈处理',
        meta: { role: 1 },
        iconCls: 'fa fa-star',
        leaf: false,//不只一个节点
        hidden: false,
        children: [
            {
                path: '/page4',
                component: Page4,
                name: '反馈处理',
                meta: {
                    title: "列表",
                    role: 1
                }
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '开放教室资源',
        meta: { role: 1 },
        iconCls: 'fa fa-pencil-square-o',
        leaf: false,//不只一个节点
        hidden: false,
        children: [
            {
                path: '/tinymce',
                component: tinymceEditor,
                name: '开放教室资源',
                meta: { role: 1 },
            }
        ]
    } ,
    {
        path: '/',
        component: Home,
        name: '调换信息',
        meta: { role: 2 },
        iconCls: 'fa fa-diamond',
        children: [
            { path: '/threejs',
              component: threejs, 
              name: 'threejs',
              meta: { role: 2 } 
            }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
  ];*/


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
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-cog',//图标样式class
        leaf: true,//只有一个节点
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
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
        hidden: false,
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
        name: '调换',
        iconCls: 'fa fa-bar-chart',
        leaf: true,//只有一个节点
        children: [
            { path: '/Page4', component: Page4, name: '调换信息' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理员操作',
        iconCls: 'fa fa-star',
        leaf: false,
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
                name: '调换课程审核',
                meta: {
                    title: "调换课程审核"
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