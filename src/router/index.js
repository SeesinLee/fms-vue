import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
const originPush = VueRouter.prototype.push
// eslint-disable-next-line
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue')
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/dashboard.vue')
      },
      {
        path: '/list',
        name: 'list',
        component: () => import('@/views/list/list.vue')
      },
      {
        path: '/list/edit',
        name: 'editList',
        component: () => import('@/views/list/edit.vue')
      },
      {
        path: '/list/create',
        name: 'createList',
        component: () => import('@/views/list/create.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/user.vue')
      },
      {
        path: '/admin/user',
        name: 'admin',
        component: () => import('@/views/admin/admin.vue')
      },
      {
        path: '/admin/group',
        name: 'group',
        component: () => import('@/views/admin/group.vue')
      }

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error/error.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()

  const token = localStorage.getItem('ginessential_user_token')

  if (token) return next()

  alert('未登录，请先登陆!')
  router.push({
    name: 'login'
  })
})

const sourceWarn = window.console.warn
// 复写warn方法方便检查由于使用name跳转无法监控404的问题
window.console.warn = function (...rest) {
  const args = Array.from(rest)
  if (args[0] && args[0].includes('Route with name') && args[0].includes('does not exist')) {
    setTimeout(() => {
      router.push('/404')
    }, 0)
  }
  sourceWarn(...rest)
}

export default router
