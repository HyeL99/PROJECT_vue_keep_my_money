import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Intro.vue";
// import store from "@/store";

Vue.use(VueRouter);

const redirectToLogin = (to, from, next) => {
  next();
  // if (store.state.loginStore.isLogin) {
  //   if (to.name === "login") router.replace({ name: "my" });
  //   else next();
  // } else {
  //   if (from.name !== "login") router.replace({ name: "login" });
  // }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: (to, from, next) => redirectToLogin(to, from, next),
  },
  {
    path: "/main",
    name: "main",
    component: () =>
      import(/* webpackChunkName: "mngIndex" */ "../views/MainView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "mngIndex" */ "../views/Login.vue"),
    beforeEnter: (to, from, next) => redirectToLogin(to, from, next),
  },
  {
    path: "/my",
    name: "my",
    component: () =>
      import(/* webpackChunkName: "mngIndex" */ "../views/MyPage.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "mngIndex" */ "../views/Error.vue"),
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
