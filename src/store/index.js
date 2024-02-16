import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    userData: {},
    tempUserData: {},
  },
  mutations: {
    initUserData(state) {
      state.isLogin = false;
      state.userData = {};
      state.tempUserData = {};
    },
    settingUserData(state, payload) {
      state.isLogin = true;
      state.userData = Object.assign({}, state.userData, payload);
    },
    settingTempUserData(state, payload) {
      state.tempUserData = Object.assign({}, state.userData, payload);
    },
  },
  actions: {},
  modules: {},
});
