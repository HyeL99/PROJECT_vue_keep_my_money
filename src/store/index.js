import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import loginStore from "@/store/modules/loginStore";
import dataStore from "@/store/modules/dataStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // categoryList: [
    //   { name: "식비" },
    //   { name: "카페/간식" },
    //   { name: "의료/건강/보험" },
    //   { name: "술/유흥" },
    //   { name: "쇼핑" },
    //   { name: "미용" },
    //   { name: "교통" },
    //   { name: "주거/통신" },
    //   { name: "취미/여가" },
    //   { name: "여행" },
    //   { name: "교육" },
    //   { name: "저축/투자" },
    //   { name: "급여" },
    //   { name: "기타" },
    // ],
  },
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
