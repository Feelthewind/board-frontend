import axios from "axios";

export default {
  namespaced: true,
  state: {
    posts: null,
    currentPost: null,
  },
  getters: {},
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_CURRENT_POST(state, post) {
      state.currentPost = post;
    },
  },
  actions: {
    async createPost(_, post) {
      await axios.post("posts", post);
    },
    async fetchPosts({ commit }, pageNumber) {
      const response = await axios.get(`posts?page=${pageNumber || 1}`);
      console.log(response.data);
      commit("SET_POSTS", response.data[0]);
    },
    async getPost({ commit }, id) {
      commit("SET_CURRENT_POST", null);
      const response = await axios.get(`posts/${id}`);
      commit("SET_CURRENT_POST", response.data.data);
    },
    async updatePost(_, post) {
      console.log(post);
      const response = await axios.put(`posts/${post.id}`, post);
      console.log(response);
    },
    async deletePost(_, id) {
      await axios.delete(`posts/${id}`);
    },
  },
};
