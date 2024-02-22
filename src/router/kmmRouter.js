const routes = [
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
  },
  {
    path: "/my",
    name: "my",
    component: () =>
      import(/* webpackChunkName: "mngIndex" */ "../views/MyPage.vue"),
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

export default routes;
