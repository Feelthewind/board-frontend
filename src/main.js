import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

require("@/store/subscriber");

axios.defaults.baseURL = "http://127.0.0.1:8000";

Vue.config.productionTip = false;

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  router.beforeEach((to, from, next) => {
    console.log("dfdf");
    console.log(to.matched[0]);
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!store.getters["auth/authenticated"]) {
        next({
          name: "signin",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
      if (store.getters["auth/authenticated"]) {
        next({
          name: "board",
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
