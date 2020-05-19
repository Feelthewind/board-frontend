<template>
  <div>
    <div>
      <input v-model="form.title" placeholder="제목" />
    </div>
    <!-- <div>
      <textarea v-model="form.description" placeholder="내용" rows="10" />
    </div> -->
    <!-- <wysiwyg v-model="form.description" /> -->
    <vue-editor
      v-model="form.description"
      useCustomImageHandler
      @image-added="handleImageAdded"
      @image-removed="handleImageRemoved"
    ></vue-editor>
    <button
      @click="updateMode ? update() : upload()"
      class="btn-save"
      :disabled="!form.description || !form.title"
    >
      저장
    </button>
    <button @click="cancel" class="btn-cancel">취소</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { VueEditor } from "vue2-editor";
import axios from "axios";

export default {
  name: "board-create",
  components: {
    VueEditor,
  },
  data() {
    const contentId = Number(this.$route.params.contentId);

    return {
      form: {
        title: "",
        description: "",
        image: "1.gif",
      },
      updateMode: this.$route.params.contentId > 0 ? true : false,
      contentId,
      myHTML: "",
      files: [],
    };
  },
  created() {
    if (this.$route.params.contentId > 0) {
      const contentId = Number(this.$route.params.contentId);
      const updateObject = this.posts.filter(
        (post) => post.id === contentId
      )[0];
      this.form.title = updateObject.title;
      this.form.description = updateObject.description;
    }
  },
  computed: {
    ...mapState({
      posts: (state) => state.board.posts.data,
    }),
    // disabled: !this.form.title || !this.form.description
  },
  methods: {
    ...mapActions({
      createPost: "board/createPost",
      updatePost: "board/updatePost",
    }),
    upload() {
      this.createPost({
        ...this.form,
        images: this.files,
      }).then(() => {
        this.$router.replace({
          name: "board-list",
        });
      });
    },
    update() {
      this.updatePost({ ...this.form, id: this.contentId }).then(() => {
        this.$router.push({
          name: "board-list",
        });
      });
    },
    cancel() {
      // 이미지 삭제
      if (this.files.length > 0) {
        axios
          .post("deleteimages", {
            images: this.files,
          })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (this.$route.params.contentId > 0) {
        this.$router.push({
          path: "/board/detail/" + this.$route.params.contentId,
        });
      } else {
        this.$router.push({
          path: "/board",
        });
      }
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("image", file);

      console.log(file);
      console.log(Editor);
      console.log(cursorLocation);
      console.log(resetUploader);
      axios
        .post("uploadimage", formData)
        .then((result) => {
          console.log(result);
          let url = result.data.url; // Get url from response
          this.files.push(url.slice(9));

          Editor.insertEmbed(
            cursorLocation,
            "image",
            `http://127.0.0.1:8000${url}`
          );
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleImageRemoved: function(file) {
      console.log("handleImageRemoved called!");
      const data = file.split("/uploads/");
      axios
        .post("deleteimages", {
          images: [data[1]],
        })
        .then(() => {
          // console.log(result);
          console.log(this.files);
          this.files = this.files.filter((f) => f !== data[1]);
          console.log(this.files);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
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
