import router from '@/router'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store'

const whiteList = ['/login', '/404']

// 前置守卫
router.beforeEach((to, from, next) => {
  nprogress.start()

  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
      nprogress.done()
    } else {
      next()
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
