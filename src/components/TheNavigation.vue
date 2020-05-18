<template>
  <ul>
    <li>
      {{ user }}
      <router-link
        :to="{
          name: 'home',
        }"
        >Home</router-link
      >
    </li>
    <li>
      <router-link
        :to="{
          name: 'board',
        }"
        >Board</router-link
      >
    </li>
    <li v-if="authenticated">{{ user.name }} {{ user.email }}</li>
    <template v-else>
      <li>
        <router-link
          :to="{
            name: 'signin',
          }"
          >Sign in</router-link
        >
      </li>
      <li>
        <router-link
          :to="{
            name: 'register',
          }"
          >Register</router-link
        >
      </li>
    </template>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
};
</script>
