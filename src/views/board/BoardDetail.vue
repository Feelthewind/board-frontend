<template>
  <div>
    <div>Board Detail</div>
    <div v-if="post">{{ post.title }}</div>
    <div v-if="authenticated">
      <button @click="updateData" class="btn-update">수정</button>
      <button @click="deleteData" class="btn-delete">삭제</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import bus from "../../utils/bus.js";

export default {
  computed: {
    ...mapState({
      post: state => state.board.currentPost
    }),
    ...mapGetters({
      authenticated: "auth/authenticated"
    })
  },
  data() {
    const contentId = Number(this.$route.params.contentId);
    return {
      contentId
    };
  },
  created() {
    bus.$emit("start:spinner");
    const contentId = Number(this.$route.params.contentId);
    this.getPost(contentId).then(() => {
      bus.$emit("end:spinner");
    });
  },
  methods: {
    ...mapActions({
      getPost: "board/getPost",
      deletePost: "board/deletePost"
    }),
    updateData() {
      this.$router.push({
        path: `/board/create/${this.contentId}`
      });
    },
    deleteData() {
      this.deletePost(this.contentId);
      this.$router.replace({
        path: `/board`
      });
    }
  }
};
</script>

<style lang="scss">
.btn-update {
  width: 80px;
  padding: 10px 8px;
  font-size: 14px;
  font-weight: bold;
  background: #60bd4f;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: darken(#60bd4f, 10%);
  }
}
.btn-delete {
  width: 80px;
  padding: 10px 8px;
  font-size: 14px;
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