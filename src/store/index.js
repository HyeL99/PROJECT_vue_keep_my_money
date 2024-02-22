import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import loginStore from "@/store/modules/loginStore";
import anotherStore from "@/store/modules/anotherStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loginStore: loginStore,
    anotherStore: anotherStore,
  },
  plugins: [
    createPersistedState({
      paths: ["loginStore"],
    }),
  ],
});
