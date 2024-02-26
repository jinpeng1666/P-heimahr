import router from '@/router'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store'

import { asyncRoutes } from '@/router'

const whiteList = ['/login', '/404']

// 前置守卫
router.beforeEach(async(to, from, next) => {
  nprogress.start()

  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
      nprogress.done()
    } else {
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        const filterRoutes = asyncRoutes.filter(item => {
          roles.menus.includes(item.name)
        })
        router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }]) // 添加动态路由
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nprogress.done()
    }
  }
})

// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
