import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

// 创建一个新的axios示例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
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
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, (error) => {
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})

export default service
