import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '欢迎页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '欢迎页', icon: 'dashboard'}
    }]
  },

  // 认证授权
/*  {
    path: '/auth',
    component: Layout,
    redirect: '/auth/adminList',
    name: '认证授权管理',
    meta: { title: '认证授权管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'adminList',
        name: '管理员名单',
        component: () => import('@/views/auth/list'),
        meta: { title: '管理员名单', icon: 'table' }
      },
      {
        path: 'form',
        name: '管理员添加',
        component: () => import('@/views/auth/form'),
        meta: { title: '管理员添加', icon: 'form' }
      },
      {
        path: '/editReader/:id',
        name: '管理员修改',
        component: () => import('@/views/auth/form'),
        meta: { title: '管理员修改'},
        hidden:true
      }
    ]
  },*/

  // 对象存储
  {
    path: '/os',
    component: Layout,
    redirect: '/os/list',
    name: '对象存储管理',
    meta: { title: '对象存储管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '文件列表',
        component: () => import('@/views/os/list'),
        meta: { title: '文件列表', icon: 'table' }
      },
      {
        path: 'form',
        name: '文件添加',
        component: () => import('@/views/os/form'),
        meta: { title: '文件添加', icon: 'form' }
      },
      {
        path: '/editReader/:id',
        name: '文件修改',
        component: () => import('@/views/os/form'),
        meta: { title: '文件修改'},
        hidden:true
      }
    ]
  },

  // 短链接
  {
    path: '/link',
    component: Layout,
    redirect: '/link/list',
    name: '短链接管理',
    meta: { title: '短链接管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '短链接列表',
        component: () => import('@/views/link/list'),
        meta: { title: '短链接列表', icon: 'table' }
      },
      {
        path: 'form',
        name: '短链接添加',
        component: () => import('@/views/link/form'),
        meta: { title: '短链接添加', icon: 'form' }
      },
      {
        path: '/editReader/:id',
        name: '短链接修改',
        component: () => import('@/views/link/form'),
        meta: { title: '短链接修改'},
        hidden:true
      }
    ]
  },

  // 消息下发
  {
    path: '/message',
    component: Layout,
    redirect: '/message/form',
    name: '消息下发管理',
    meta: { title: '消息下发管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'form',
        name: '发送邮件',
        component: () => import('@/views/message/form'),
        meta: { title: '发送邮件', icon: 'form' }
      }
    ]
  },

  // 及时通信
  {
    path: '/im',
    component: Layout,
    redirect: '/im/list',
    name: '及时通信管理',
    meta: { title: '及时通信管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '及时通信在线列表',
        component: () => import('@/views/im/list'),
        meta: { title: '及时通信在线列表', icon: 'table' }
      },
      {
        path: 'test',
        name: '测试界面',
        component: () => import('@/views/im/test'),
        meta: { title: '测试界面', icon: 'form' }
      },
    ]
  },

  // {
  //   path: '/reader',
  //   component: Layout,
  //   redirect: '/reader/adminList',
  //   name: '读者管理',
  //   meta: { title: '读者管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'adminList',
  //       name: '管理员名单',
  //       component: () => import('@/views/reader/admin'),
  //       meta: { title: '管理员名单', icon: 'table' }
  //     },
  //     {
  //       path: 'list',
  //       name: '读者列表',
  //       component: () => import('@/views/reader/list'),
  //       meta: { title: '读者列表', icon: 'table' }
  //     },
  //     {
  //       path: 'form',
  //       name: '读者添加',
  //       component: () => import('@/views/reader/form'),
  //       meta: { title: '读者添加', icon: 'form' }
  //     },
  //     {
  //       path: '/editReader/:id',
  //       name: '读者修改',
  //       component: () => import('@/views/reader/form'),
  //       meta: { title: '读者修改'},
  //       hidden:true
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/book',
  //   component: Layout,
  //   redirect: '/book/list',
  //   name: '图书管理',
  //   meta: { title: '图书管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '图书列表',
  //       component: () => import('@/views/book/list'),
  //       meta: { title: '图书列表', icon: 'table' }
  //     },
  //     {
  //       path: 'form',
  //       name: '图书添加',
  //       component: () => import('@/views/book/form'),
  //       meta: { title: '图书添加', icon: 'form' }
  //     },
  //     {
  //       path: '/edit/:id',
  //       name: '图书修改',
  //       component: () => import('@/views/book/form'),
  //       meta: { title: '图书修改'},
  //       hidden:true
  //     },
  //     {
  //       path: '/editRecord/:id',
  //       name: '借书记录添加',
  //       component: () => import('@/views/book/formRecord'),
  //       meta: { title: '借书记录添加'},
  //       hidden:true
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/record',
  //   component: Layout,
  //   redirect: '/record/list',
  //   name: '借书记录管理',
  //   meta: { title: '借书记录管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '记录列表',
  //       component: () => import('@/views/record/list'),
  //       meta: { title: '记录列表', icon: 'table' }
  //     },
  //     {
  //       path: 'form',
  //       name: '记录添加',
  //       component: () => import('@/views/record/form'),
  //       meta: { title: '记录添加', icon: 'form' }
  //     },
  //     {
  //       path: '/editRecord2/:id',
  //       name: '记录修改',
  //       component: () => import('@/views/record/form'),
  //       meta: { title: '记录修改'},
  //       hidden:true
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
