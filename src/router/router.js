import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};


export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        // { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        // { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        // { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
        { path: '/system/role/manage/add', title: '添加角色', name: 'role-add', component: () => import('@/views/system/role-add.vue') },
        { path: '/system/role/manage/upd', title: '修改角色', name: 'role-upd', component: () => import('@/views/system/role-add.vue') },
        { path: '/system/user/manage/add', title: '添加用户', name: 'user-add', component: () => import('@/views/system/user-add.vue') },
        { path: '/system/user/manage/upd', title: '修改用户', name: 'user-upd', component: () => import('@/views/system/user-add.vue') }, 
        { path: '/configure/interface/add', title: '添加物联网接口', name: 'interface-add', component: () => import('@/views/configure/interface-add.vue') },
        { path: '/configure/ioserver/add', title: '添加Ioserver', name: 'ioserver-add', component: () => import('@/views/configure/ioserver-add.vue') },
        { path: '/configure/interface/upd', title: '修改物联网接口', name: 'interface-upd', component: () => import('@/views/configure/interface-add.vue') },
        { path: '/configure/control/setting', title: '配置控制接口', name: 'control-setting', component: () => import('@/views/configure/control-setting.vue') },
        { path: '/configure/distribute/setting', title: '配置分发接口', name: 'distribute-setting', component: () => import('@/views/configure/control-setting.vue') },
        { path: '/configure/map', title: '映射变量', name: 'configure-map', component: () => import('@/views/configure/map-validate.vue') },
        { path: '/configure/distribute/detail', title: '分发详情', name: 'fa-detail', component: () => import('@/views/configure/fa-detail.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/',
        icon: 'key',
        name: 'index',
        title: '监控管理',
        component: Main,
        children: [
            { path: 'index1', title: '服务监控', name: 'index1', component: () => import('@/views/home/home.vue') },
            { path: 'index2', title: 'IOServer设备监控', name: 'index2', component: () => import('@/views/home/home2.vue') },
            { path: 'index3', title: '模型设备监控', name: 'index3', component: () => import('@/views/configure/fa-detail.vue') }
        ]
    }, {
        path: 'configure',
        icon: 'key',
        name: 'configure',
        title: '配置管理',
        component: Main,
        children: [
            { path: '/configure/interface/manage', title: '物联网接口管理', name: 'configure-interface-manage', component: () => import('@/views/configure/interface-manage.vue') },
            { path: '/configure/synchronous/data', title: 'IOServer管理', name: 'configure-synchronous-data', component: () => import('@/views/configure/synchronous-data.vue') },
            { path: '/configure/collect/manage', title: '采集管理', name: 'configure-collect-manage', component: () => import('@/views/configure/collect-manage.vue') },
            { path: '/configure/control/manage', title: '控制接口管理', name: 'configure-control-manage', component: () => import('@/views/configure/control-manage.vue') },
            { path: '/configure/distribute/manage', title: '分发接口管理', name: 'configure-distribute-manage', component: () => import('@/views/configure/distribute-manage.vue') },
        ]
    }, {
        path: 'system',
        icon: 'key',
        name: 'system',
        title: '系统管理',
        component: Main,
        children: [
            { path: '/system/user/manage', title: '用户管理', name: 'system-user-manage', component: () => import('@/views/system/user-manage.vue') },
            { path: '/system/role/manage', title: '角色管理', name: 'system-role-manage', component: () => import('@/views/system/role-manage.vue') },
            { path: '/system/controller/manage', title: '日志管理', name: 'system-controller-manage', component: () => import('@/views/system/controller-manage.vue') }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
