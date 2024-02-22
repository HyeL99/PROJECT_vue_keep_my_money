import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.store = app.$store;
window.router = app.$router;

const thisTheme = localStorage.getItem("colorTheme") || "red";
document.documentElement.setAttribute("data-theme", thisTheme);
