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
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 测试页面
  {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/test/index'),
        name: 'TestIndex',
        meta: { title: '测试页面', icon: 'skill', noCache: true, roles: ['admin'] }
      }
    ]
  },
  // 预约者页面
  {
    path: '/appointment',
    component: Layout,
    redirect: '/appointment_user/index',
    hidden: false,
    children: [
      {
        path: 'AppointmentUserIndex',
        component: () => import('@/views/appointment_user/index'),
        name: 'AppointmentUserIndex',
        meta: { title: '预约者', icon: 'skill', noCache: true, roles: ['jianyan'] }
      }
    ]
  },
  // 填写检验报表
  {
    path: '/testReport',
    component: Layout,
    redirect: '/testReport/index',
    hidden: true,
    children: [
      {
        path: 'TestReportIndex',
        component: () => import('@/views/test_report/index'),
        name: 'TestReportIndex',
        meta: { title: '检验报表', icon: 'skill', noCache: true, roles: ['jianyan'] }
      }
    ]
  },
  // 血库管理
  {
    path: '/xueku',
    component: Layout,
    redirect: '/xueku/index',
    hidden: false,
    children: [
      {
        path: 'XueKuIndex',
        component: () => import('@/views/xueku/index'),
        name: 'XueKuIndex',
        meta: { title: '血库管理', icon: 'skill', noCache: true, roles: ['xueku'] }
      }
    ]
  },
  // 管理员管理页面
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index',
    hidden: false,
    children: [
      {
        path: 'AdminIndex',
        component: () => import('@/views/admin/index'),
        name: 'AdminIndex',
        meta: { title: '管理员管理', icon: 'skill', noCache: true, roles: ['admin'] }
      }
    ]
  },
  // 公告管理页面
  {
    path: '/message',
    component: Layout,
    redirect: '/message/index',
    hidden: false,
    children: [
      {
        path: 'MessageIndex',
        component: () => import('@/views/message/index'),
        name: 'MessageIndex',
        meta: { title: '公告管理', icon: 'skill', noCache: true, roles: ['admin'] }
      }
    ]
  },
  // 注意事项
  {
    path: '/careful',
    component: Layout,
    redirect: '/careful/index',
    hidden: false,
    children: [
      {
        path: 'CarefulIndex',
        component: () => import('@/views/careful/index'),
        name: 'CarefulIndex',
        meta: { title: '注意事项', icon: 'skill', noCache: true, roles: ['admin'] }
      }
    ]
  },
  // 献血地点标注
  {
    path: '/bloodAddress',
    component: Layout,
    redirect: '/blood-address/index',
    hidden: false,
    children: [
      {
        path: 'CarefulIndex',
        component: () => import('@/views/blood-address/index'),
        name: 'AddressIndex',
        meta: { title: '献血地点', icon: 'skill', noCache: true, roles: ['admin'] }
      }
    ]
  },
  // 用户管理
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    hidden: false,
    children: [
      {
        path: 'UserIndex',
        component: () => import('@/views/user/index'),
        name: 'UserIndex',
        meta: { title: '用户管理', icon: 'skill', noCache: true, roles: ['admin'] }
      }
    ]
  },
  // 用户献血记录
  {
    path: '/userBloodRecord',
    component: Layout,
    redirect: '/blood_record/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/blood_record/index'),
        name: 'userBloodRecord',
        meta: { title: '献血记录', icon: 'skill', noCache: true, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    hidden: true,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

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
