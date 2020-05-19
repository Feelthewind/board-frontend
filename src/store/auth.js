import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },
  getters: {
    authenticated(state) {
      return state.token && state.user;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async signIn({ dispatch }, credentials) {
      const response = await axios.post("auth/signin", credentials);

      dispatch("attempt", response.data.token);
    },

    async attempt({ commit, state }, token) {
      if (token) {
        commit("SET_TOKEN", token);
      }

      if (!state.token) {
        return;
      }

      try {
        const response = await axios.get("auth/me");

        commit("SET_USER", response.data);
      } catch (e) {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },
    async register(_, credentials) {
      const response = await axios.post("users", credentials);

      console.log(response);

      // dispatch("attempt", response.data.token);
    },
  },
};
