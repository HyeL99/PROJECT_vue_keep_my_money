import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  accountList: [],
  cardList: [],
  historyList: [],
  categoryList: [],
  isSetData: false,
};
const getters = {};
const mutations = {
  initData(state) {
    state.accountList = [];
    state.cardList = [];
    state.historyList = [];
  },
  settingData(state, { type, data }) {
    switch (type) {
      case "acc":
        state.accountList = data;
        break;
      case "card":
        state.cardList = data;
        break;
      case "his":
        state.historyList = data;
        break;
      case "ctg":
        state.categoryList = data;
        break;
    }
  },
  setDataState(state, payload) {
    state.isSetData = payload;
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
