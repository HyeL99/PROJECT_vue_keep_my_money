const routes = [
  {
    path: "/calendar",
    name: "calendar",
    component: () =>
      import(/* webpackChunkName: "mngIndex" */ "../views/kmm/MainView.vue"),
  },
  {
    path: "/account",
    name: "account",
    component: () =>
      import(/* webpackChunkName: "mngIndex" */ "../views/kmm/MyPage.vue"),
  },

  {
    path: "/manage",
    name: "manage",
    component: () =>
      import(/* webpackChunkName: "mngIndex" */ "../views/kmm/Manage.vue"),
  },
  {
    path: "/statistics",
    name: "statistics",
    component: () =>
      import(/* webpackChunkName: "mngIndex" */ "../views/kmm/Statistics.vue"),
  },
];

export default routes;
