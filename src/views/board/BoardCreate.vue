<template>
  <div>
    <div>
      <input v-model="form.title" placeholder="제목" />
    </div>
    <div>
      <textarea v-model="form.description" placeholder="내용" rows="10" />
    </div>
    <button
      @click="updateMode ? update() : upload()"
      class="btn-save"
      :disabled="!form.description || !form.title"
    >저장</button>
    <button @click="cancel" class="btn-cancel">취소</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "board-create",
  data() {
    const contentId = Number(this.$route.params.contentId);

    return {
      form: {
        title: "",
        description: "",
        image: "1.gif"
      },
      updateMode: this.$route.params.contentId > 0 ? true : false,
      contentId
    };
  },
  created() {
    if (this.$route.params.contentId > 0) {
      const contentId = Number(this.$route.params.contentId);
      const updateObject = this.posts.filter(post => post.id === contentId)[0];
      this.form.title = updateObject.title;
      this.form.description = updateObject.description;
    }
  },
  computed: {
    ...mapState({
      posts: state => state.board.posts.data
    })
    // disabled: !this.form.title || !this.form.description
  },
  methods: {
    ...mapActions({
      createPost: "board/createPost",
      updatePost: "board/updatePost"
    }),
    upload() {
      this.createPost(this.form).then(() => {
        this.$router.replace({
          name: "board-list"
        });
      });
    },
    update() {
      this.updatePost({ ...this.form, id: this.contentId }).then(() => {
        this.$router.push({
          name: "board-list"
        });
      });
    },
    cancel() {
      if (this.$route.params.contentId > 0) {
        this.$router.push({
          path: "/board/detail/" + this.$route.params.contentId
        });
      } else {
        this.$router.push({
          path: "/board"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.btn-save {
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
  &:disabled {
    background: lighten(#60bd4f, 25%);
    cursor: not-allowed;
  }
}
.btn-cancel {
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