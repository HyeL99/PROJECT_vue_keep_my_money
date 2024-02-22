import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  hello: "world",
};
const getters = {};
const mutations = {};
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
