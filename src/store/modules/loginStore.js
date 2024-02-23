import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  isLogin: false,
  userData: {},
};
const getters = {};
const mutations = {
  initUserData(state) {
    state.isLogin = false;
    state.userData = {};
  },
  settingUserData(state, payload) {
    state.isLogin = true;
    state.userData = Object.assign({}, state.userData, payload);
  },
};
const actions = {};

export default {
  namespaced: true,
  state: {
    ...state,
  },
  getters,
  mutations,
  actions,
};
