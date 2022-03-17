import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import storageService from '@/service/storageService'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tab,
    userModule: {
      namespaced: true,
      state: {
        token: storageService.get(storageService.USER_TOKEN),
        userInfo: JSON.parse(storageService.get(storageService.USER_INFO)),
        groupMem: JSON.parse(storageService.get(storageService.USER_ADMIN)),
        groups: JSON.parse(storageService.get(storageService.GROUP_NAMES)),
        groupDetails: JSON.parse(storageService.get(storageService.GROUP_DETAILS))
      },
      mutations: {
        // eslint-disable-next-line
        SET_TOKEN(state, token) {
          // 更新本地缓存
          storageService.set(storageService.USER_TOKEN, token)
          // 更新state
          state.token = token
        },
        // eslint-disable-next-line
        SET_USERINFO(state, userInfo) {
          // 更新本地缓存
          storageService.set(storageService.USER_INFO, JSON.stringify(userInfo))
          // 更新states
          state.userInfo = userInfo
        },
        // eslint-disable-next-line
        SET_USERGROUP(state, groupMem) {
          // 更新本地缓存
          storageService.set(storageService.USER_ADMIN, JSON.stringify(groupMem))
          // 更新states
          // state.groupMem = groupMem
        },
        // eslint-disable-next-line
        SET_GROUPS(state, groups) {
          storageService.set(storageService.GROUP_NAMES, JSON.stringify(groups))
          state.groups = groups
        },
        // eslint-disable-next-line
        SET_GROUPDETAILS(state, groupDetails) {
          storageService.set(storageService.GROUP_DETAILS, JSON.stringify(groupDetails))
        },
        // eslint-disable-next-line
        SET_LISTID(state, listId) {
          storageService.set(storageService.LIST_ID, JSON.stringify(listId))
        }
      }
    }
  }
})
