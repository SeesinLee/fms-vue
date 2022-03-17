export default {
  state: {
    isCollapse: false,
    tablesList: [
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    currentMenu: null
  },
  mutations: {
    // eslint-disable-next-line
    collagseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // eslint-disable-next-line
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        const result = state.tablesList.findIndex(item => item.name === val.name)
        if (result === -1) {
          state.tablesList.push(val)
        }
      } else {
        state.currentMenu = null
      }
    }
  }
}
