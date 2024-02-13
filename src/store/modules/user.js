// 导入js-cookie
import { getToken, setToken, removeToken } from '@/utils/auth'

import { login } from '@/api/user'

const state = {
  token: getToken()
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken() {
    state.token = null
    removeToken()
  }
}

const actions = {
  async login(context, data) {
    console.log(data)
    const token = await login(data)
    context.commit('setToken', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
