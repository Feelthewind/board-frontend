<template>
  <form @submit.prevent="submit" class="login-form">
    <div>
      <label for="email">Email</label>

      <input type="text" name="email" id="email" v-model="form.email" class="login-input" />
    </div>

    <div>
      <label for="password">Password</label>

      <input
        type="password"
        name="password"
        id="password"
        v-model="form.password"
        class="login-input"
      />
    </div>

    <div>
      <button type="submit" class="btn-submit" :disabled="!form.email || !form.password">Sign in</button>
    </div>

    <div v-if="error">인증 실패</div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "sign-in",
  components: {},

  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: false
    };
  },

  methods: {
    ...mapActions({
      signIn: "auth/signIn"
    }),
    submit() {
      this.signIn(this.form)
        .then(() => {
          this.$router.push({
            path: "/board"
          });
          // this.$router.replace(this.$route.query.redirect || '/')
        })
        .catch(e => {
          console.log("failed");
          console.log(e);
          this.error = true;
        });
    }
  }
};
</script>

<style lang="scss">
.login-form {
  max-width: 500px;
  margin: auto;
}
label {
  display: block;
  margin-bottom: 4px;
}
.login-input {
  width: 100%;
  font-size: 16px;
  padding: 12px 16px;
  outline: 0;
  border-radius: 3px;
  border: 1px solid lightgrey;
  margin-bottom: 16px;
}
.btn-submit {
  width: 100%;
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
  &:disabled {
    background: lighten(#60bd4f, 25%);
    cursor: not-allowed;
  }
}
</style>
