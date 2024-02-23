import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  accountList: [],
  cardList: [],
  accountHistoryList: [],
  cardHistoryList: [],
  isSetData: false,
};
const getters = {};
const mutations = {
  initData(state) {
    state.accountList = [];
    state.cardList = [];
    state.accountHistoryList = [];
    state.cardHistoryList = [];
  },
  settingData(state, { type, data }) {
    switch (type) {
      case "acc":
        state.accountList = data;
        break;
      case "card":
        state.cardList = data;
        break;
      case "accHis":
        state.accountHistoryList = data;
        break;
      case "cardHis":
        state.cardHistoryList = data;
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
