import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";
import lodash from "lodash";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

Vue.config.productionTip = false;

Vue.prototype.$moment = moment;
Vue.prototype._ = lodash;
Vue.prototype.$_Chart = ChartJS;

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.store = app.$store;
window.router = app.$router;

const thisTheme = localStorage.getItem("color") || "red";
document.documentElement.setAttribute("data-theme", thisTheme);
store.commit("dataStore/setDataState", false);
