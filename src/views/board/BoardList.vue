<template>
  <div>
    <div v-if="loading"></div>
    <template v-else>
      <div v-if="posts && posts.data.length > 0">
        <div v-for="post in posts.data" :key="post.id">
          <div class="post-item" @click="rowClick(post.id)">
            <div class="post-item__left">{{ post.title }}</div>
            <div
              class="post-item__right"
              v-html="formatDescription(post.description)"
            ></div>
            <div>{{ formatDate(post.created_at) }}</div>
          </div>
        </div>

        <div class="pagination">
          <Pagination
            :total="posts.total"
            :currentPage="posts.current_page"
            :pageSize="posts.per_page"
            v-on:page:update="updatePage"
          />
        </div>
      </div>
      <div v-else>
        <p class="empty-message">첫 글을 작성해주세요.</p>
      </div>

      <app-button name="글쓰기" :onClick="writeContent" />
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import bus from "../../utils/bus.js";
import Pagination from "@/components/Pagination";
import AppButton from "@/components/Button";

export default {
  name: "boardList",
  components: {
    Pagination,
    AppButton,
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.loading = true;
    bus.$emit("start:spinner");
    this.fetchPosts()
      .then(() => {
        this.loading = false;
        bus.$emit("end:spinner");
      })
      .catch(() => {
        this.loading = false;
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
    formatDescription(description) {
      return description.replace(/<img .*?>/g, "");
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
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
.pagination {
  display: flex;
  justify-content: center;
}
.empty-message {
  text-align: center;
}
</style>
