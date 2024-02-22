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
  console.log("to", to.name, to.path);
  console.log("from", from.name, from.path);
  console.log(store.state);
  if (to.name === "error") next();
  else if (to.name === "intro") {
    if (store.state.loginStore.isLogin) {
      next({name: "main"});
    } else {
      next();
    }
  } else {
    if (store.state.loginStore.isLogin) {
      next();
    } else {
      next("/");
    }
  }
  // console.log('asdfasdf', to, from, next)
  //
  next();
});
export default router;
