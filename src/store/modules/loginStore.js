import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  isLogin: false,
  userData: {},
  tempUserData: {},
};
const getters = {};
const mutations = {
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
