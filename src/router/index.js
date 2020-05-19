import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import SignIn from "../views/SignIn.vue";
import BoardList from "../views/board/BoardList.vue";
import BoardCreate from "../views/board/BoardCreate.vue";
import BoardDetail from "../views/board/BoardDetail.vue";
import NotFound from "../views/NotFound.vue";
// import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/board",
    name: "board-list",
    component: BoardList,
    // beforeEnter: (to, from, next) => {
    //   if (store.getters["auth/authenticated"]) {
    //     return next({
    //       name: "signin",
    //     });
    //   }

    //   next();
    // },
  },
  {
    path: "/board/create/:contentId?",
    name: "board-create",
    component: BoardCreate,
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: "/board/detail/:contentId",
    name: "board-detail",
    component: BoardDetail,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
