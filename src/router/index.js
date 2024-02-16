import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "mngIndex" */ "../views/Login.vue"),
  },
  {
    path: "/mng",
    name: "mngIndex",
    component: () =>
      import(/* webpackChunkName: "mngIndex" */ "../views/manage/Index.vue"),
    children: [
      {
        path: "/card",
        name: "mngCard",
        component: () =>
          import(
            /* webpackChunkName: "mngCard" */ "../views/manage/ManageCard.vue"
          ),
      },
      {
        path: "/account",
        name: "mngAccount",
        component: () =>
          import(
            /* webpackChunkName: "mngAccount" */ "../views/manage/ManageCard.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
