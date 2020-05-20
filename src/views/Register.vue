<template>
  <form @submit.prevent="submit" class="register-form">
    <div>
      <label for="name">Name</label>

      <input type="text" name="name" id="name" v-model="form.name" class="register-input" />
    </div>

    <div>
      <label for="email">Email</label>

      <input type="text" name="email" id="email" v-model="form.email" class="register-input" />
    </div>

    <div>
      <label for="password">Password</label>

      <input
        type="password"
        name="password"
        id="password"
        v-model="form.password"
        class="register-input"
      />
    </div>

    <div>
      <label for="passwordConfirm">Password Confirmation</label>

      <input
        type="password"
        name="passwordConfirm"
        id="passwordConfirm"
        v-model="form.password_confirmation"
        class="register-input"
      />
    </div>

    <div>
      <button
        type="submit"
        class="btn-submit"
        :disabled="
          !form.email ||
            !form.password ||
            !form.password_confirmation ||
            form.password !== form.password_confirmation
        "
      >Register</button>
    </div>

    <div v-if="error">가입 실패</div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "register",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      error: false
    };
  },

  methods: {
    ...mapActions({
      register: "auth/register",
      signIn: "auth/signIn"
    }),
    async submit() {
      await this.register(this.form);
      await this.signIn({
        email: this.form.email,
        password: this.form.password
      });

      this.$router.push({
        path: "/board"
      });
    }
  }
};
</script>

<style lang="scss">
.register-form {
  max-width: 500px;
  margin: auto;
}
label {
  display: block;
  margin-bottom: 4px;
}
.register-input {
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
