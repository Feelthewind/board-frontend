<template>
  <div v-if="posts">
    <div>Board List</div>
    <div v-for="post in posts.data" :key="post.id">
      <div class="post-item" @click="rowClick(post.id)">
        <div class="post-item__left">{{ post.title }}</div>
        <div class="post-item__right" v-html="post.description"></div>
      </div>
    </div>
    <button @click="writeContent" class="btn-write">글쓰기</button>

    <Pagination
      :total="posts.total"
      :currentPage="posts.current_page"
      :pageSize="posts.per_page"
      v-on:page:update="updatePage"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import bus from "../../utils/bus.js";
import Pagination from "@/components/Pagination";

export default {
  name: "board-list",
  components: {
    Pagination,
  },
  created() {
    bus.$emit("start:spinner");
    this.fetchPosts().then(() => {
      bus.$emit("end:spinner");
    });
  },
  computed: mapState({
    posts: (state) => state.board.posts,
  }),
  methods: {
    ...mapActions({
      fetchPosts: "board/fetchPosts",
    }),
    rowClick(id) {
      this.$router.push({
        path: `/board/detail/${id}`,
      });
    },
    writeContent() {
      this.$router.push({
        path: `/board/create`,
      });
    },
    updatePage(pageNumber) {
      this.fetchPosts(pageNumber);
    },
  },
};
</script>

<style lang="scss">
.post-item {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
  border: 1px solid #ccc;
  margin-bottom: 8px;

  &__left {
    flex: 1;
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 8px;
  }

  &__right {
    flex: 3;
    max-height: 1.8em;
    line-height: 1.8em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.btn-write {
  width: 100px;
  padding: 14px 12px;
  font-size: 18px;
  font-weight: bold;
  background: #60bd4f;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: darken(#60bd4f, 10%);
  }
}
</style>
