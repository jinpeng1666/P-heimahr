import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

// 创建一个新的axios示例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
})

service.interceptors.request.use((config) => {
  // store.getters.token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  if (response.data instanceof Blob) return response.data
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  // eslint-disable-next-line no-empty
  if (error.response.status === 401) {
    Message({ type: 'warning', message: 'token超时' })
    await store.dispatch('user/logout')
    router.push('/login')
    return Promise.reject(error)
  }

  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})

export default service
