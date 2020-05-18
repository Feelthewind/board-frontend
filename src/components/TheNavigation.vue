<template>
  <ul>
    <li>
      <router-link :to="{
          name: 'home'
        }">Home</router-link>
    </li>
    <li>임창수</li>
    <li>
      <router-link :to="{
          name: 'board'
        }">Board</router-link>
    </li>
    <li>
      <router-link :to="{
          name: 'signin'
        }">Sign in</router-link>
    </li>
    <li>
      <router-link :to="{
          name: 'register'
        }">Register</router-link>
    </li>
  </ul>
</template>