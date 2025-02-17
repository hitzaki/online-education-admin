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
  {
    path: '/auth',
    component: Layout,
    redirect: '/auth/adminManage',
    name: '认证授权管理',
    meta: { title: '认证授权管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'adminManage',
        name: '管理员',
        component: () => import('@/views/auth/admin'),
        meta: { title: '管理员', icon: 'table' }
      },
      {
        path: 'adminInsert',
        name: '管理员新增',
        component: () => import('@/views/auth/admin/AdminInsert'),
        meta: { title: '管理员新增', icon: 'table' },
        hidden: true
      },
      // {
      //   path: 'form',
      //   name: '管理员添加',
      //   component: () => import('@/views/auth/form'),
      //   meta: { title: '管理员添加', icon: 'form' }
      // },
      // {
      //   path: '/editReader/:id',
      //   name: '管理员修改',
      //   component: () => import('@/views/auth/form'),
      //   meta: { title: '管理员修改'},
      //   hidden:true
      // }
      {
        path: 'userManage',
        name: '用户',
        component: () => import('@/views/auth/user'),
        meta: { title: '用户', icon: 'table' }
      },
      {
        path: 'roleManage',
        name: '角色',
        component: () => import('@/views/auth/role'),
        meta: { title: '角色', icon: 'table' }
      },
      {
        path: 'roleInsert',
        name: '角色新增',
        component: () => import('@/views/auth/role/RoleInsert'),
        meta: { title: '角色新增', icon: 'table' },
        hidden: true
      },
      {
        path: 'permissionManage',
        name: '权限',
        component: () => import('@/views/auth/permission'),
        meta: { title: '权限', icon: 'table' }
      },
      {
        path: 'permissionInsert',
        name: '权限新增',
        component: () => import('@/views/auth/permission/PermissionInsert'),
        meta: { title: '权限新增', icon: 'table' },
        hidden: true
      },
    ]
  },

  // 对象存储
  // {
  //   path: '/os',
  //   component: Layout,
  //   redirect: '/os/list',
  //   name: '对象存储管理',
  //   meta: { title: '对象存储管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '文件列表',
  //       component: () => import('@/views/os/list'),
  //       meta: { title: '文件列表', icon: 'table' }
  //     },
  //     {
  //       path: 'form',
  //       name: '文件添加',
  //       component: () => import('@/views/os/form'),
  //       meta: { title: '文件添加', icon: 'form' }
  //     },
  //     {
  //       path: '/editReader/:id',
  //       name: '文件修改',
  //       component: () => import('@/views/os/form'),
  //       meta: { title: '文件修改'},
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
