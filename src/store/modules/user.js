// 导入js-cookie
import { getToken, setToken, removeToken } from '@/utils/auth'

import { login, getUserInfo } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {} // 存储用户基本资料
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken() {
    state.token = null
    removeToken(state)
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  async login(context, data) {
    console.log(data)
    const token = await login(data)
    context.commit('setToken', token)
  },
  // 获取用户基本资料
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
    return result
  },
  // 推出登录
  logout(context) {
    context.commit('removeToken')
    context.commit('setUserInfo', {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
