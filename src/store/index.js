import { createStore } from "vuex";


export default createStore({
  state: {
    isAuthenticated: false,
    token: '',
    id: '',
    isLoading: false
  },
  mutations: {
    initializeStore(state) {

      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.id = localStorage.getItem('Id')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.id = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },
    setId(state, id) {
      state.id = id
    },
    removeId(state) {
      state.id = ''
    },
    setIsLoading(state, status) {
      state.isLoading = status
    }
  }
});
