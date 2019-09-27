const state = {
  userData: ""
}

const mutations = {
  Add_USERDATA: (state, data) => {
    state.userData = data
  },

  REMOVE_USER: (state) => {
    state.userData = ''
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      account,
      password,
      type
    } = userInfo
    return new Promise((resolve, reject) => {
      // login({
      //   account: account.trim(),
      //   password: password,
      //   type: type
      // }).then(response => {
      //   const {
      //     data
      //   } = response

      //   commit('Add_USERDATA', data[0])

      //   resolve(response)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout() {
    return new Promise((resolve, reject) => {
      // logout().then(() => {
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}