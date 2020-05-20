<template>
  <div>
    <div>
      <input v-model="form.title" placeholder="제목" />
    </div>
    <vue-editor
      v-model="form.description"
      useCustomImageHandler
      @image-added="handleImageAdded"
      @image-removed="handleImageRemoved"
    ></vue-editor>
    <app-button
      name="저장"
      :onClick="handleSave"
      :disabled="!form.description || !form.title"
    />
    <app-button name="취소" :onClick="cancel" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { VueEditor } from "vue2-editor";
import axios from "axios";
import AppButton from "@/components/Button";

export default {
  name: "boardCreate",
  components: {
    VueEditor,
    AppButton,
  },
  data() {
    const contentId =
      this.$route.params.contentId && Number(this.$route.params.contentId);

    return {
      form: {
        title: "",
        description: "",
      },
      updateMode: this.$route.params.contentId > 0 ? true : false,
      contentId,
      myHTML: "",
      files: [],
    };
  },
  created() {
    if (this.contentId > 0) {
      const updateObject = this.posts.filter(
        (post) => post.id === this.contentId
      )[0];
      this.form.title = updateObject.title;
      this.form.description = updateObject.description;
    }
  },
  computed: {
    ...mapState({
      posts: (state) => state.board.posts.data,
    }),
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
          name: "boardList",
        });
      });
    },
    update() {
      this.updatePost({ ...this.form, id: this.contentId }).then(() => {
        this.$router.push({
          name: "boardList",
        });
      });
    },
    cancel() {
      if (this.files.length > 0) {
        axios
          .post("deleteimages", {
            images: this.files,
          })
          .then(() => {})
          .catch((err) => {
            console.error(err);
          });
      }

      if (this.contentId > 0) {
        this.$router.push({
          path: "/board/detail/" + this.contentId,
        });
      } else {
        this.$router.push({
          path: "/board",
        });
      }
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("image", file);

      axios
        .post("uploadimage", formData)
        .then((result) => {
          const imagePath = result.data.imagePath;
          this.files.push(imagePath);

          Editor.insertEmbed(
            cursorLocation,
            "image",
            `http://127.0.0.1:8000/uploads/${imagePath}`
          );
          resetUploader();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleImageRemoved: function(file) {
      const data = file.split("/uploads/");
      axios
        .post("deleteimages", {
          images: [data[1]],
        })
        .then(() => {
          this.files = this.files.filter((f) => f !== data[1]);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleSave() {
      this.updateMode ? this.update() : this.upload();
    },
  },
};
</script>

<style lang="scss">
.btn {
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

  &__save {
    &:disabled {
      background: lighten(#60bd4f, 25%);
      cursor: not-allowed;
    }
  }
}
</style>
