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
import axios from "axios";

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
    async submit() {
      let response = await axios.post("auth/signin", this.form);

      console.log(response.data);
    },
  },
};
</script>
