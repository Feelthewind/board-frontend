<template>
  <form @submit.prevent="submit">
    {{ form }}
    <div>
      <label for="email">Email</label>

      <input type="text" name="email" id="email" v-model="form.email" />
    </div>

    <div>
      <label for="password">Password</label>

      <input
        type="password"
        name="password"
        id="password"
        v-model="form.password"
      />
    </div>

    <div>
      <button type="submit">Sign in</button>
    </div>
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
        password: "",
      },
    };
  },

  methods: {
    ...mapActions({
      signIn: "auth/signIn",
    }),
    submit() {
      this.signIn(this.form)
        .then(() => {
          this.$router.replace({
            name: "board",
          });
        })
        .catch(() => {
          console.log("failed");
        });
    },
  },
};
</script>
