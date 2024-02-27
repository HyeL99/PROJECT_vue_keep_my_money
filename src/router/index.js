import Vue from "vue";
import VueRouter from "vue-router";
import kmmRouter from "@/router/kmmRouter";
import store from "@/store";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "intro",
    component: () =>
      import(/* webpackChunkName: "intro" */ "@/views/Intro.vue"),
  },
  {
    path: "/secession",
    name: "secession",
    component: () =>
      import(/* webpackChunkName: "mngIndex" */ "../views/Secession.vue"),
  },
  {
    path: "/kmm",
    component: () => import("@/views/Index.vue"),
    children: [...kmmRouter],
  },
  {
    path: "/error",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "mngIndex" */ "../views/Error.vue"),
  },
  {
    path: "/*",
    redirect: "/error", //error로 변경
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.name === "error") next();
  else if (to.name === "intro") {
    next();
  } else {
    if (store.state.loginStore.isLogin && store.state.dataStore.isSetData) {
      next();
    } else {
      next("/");
    }
  }
  next();
});
export default router;
