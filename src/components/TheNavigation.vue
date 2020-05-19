<template>
  <ul class="nav">
    <li>
      {{ user }}
      <router-link :to="{
          name: 'home',
        }">Home</router-link>
    </li>
    <li>
      <router-link :to="{
          name: 'board-list',
        }">Board</router-link>
    </li>
    <li v-if="authenticated">{{ user.name }} {{ user.email }}</li>
    <template v-else>
      <li>
        <router-link :to="{
            name: 'signin',
          }">Sign in</router-link>
      </li>
      <li>
        <router-link :to="{
            name: 'register',
          }">Register</router-link>
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
      user: "auth/user"
    })
  }
};
</script>

<style lang="scss">
.nav {
  display: flex;
  list-style: none;
  padding: 15px 0;
  margin: 0;
  justify-content: flex-end;
  background: #f5f8fa;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 24px;

  a {
    color: #636b6f;
    padding: 0 25px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.1rem;
    text-decoration: none;
    text-transform: uppercase;
  }
}
</style>