import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import loginStore from "@/store/modules/loginStore";
import dataStore from "@/store/modules/dataStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loginStore: loginStore,
    dataStore: dataStore,
  },
  plugins: [
    createPersistedState({
      paths: ["loginStore"],
    }),
  ],
});
