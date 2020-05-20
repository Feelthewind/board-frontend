<template>
  <div id="app" class="container">
    <navigation />
    <router-view />
    <spinner :loading="LoadingStatus" />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Spinner from "@/components/Spinner";
import bus from "./utils/bus.js";

export default {
  components: {
    Navigation,
    Spinner
  },
  data() {
    return {
      LoadingStatus: false
    };
  },
  methods: {
    startSpinner() {
      this.LoadingStatus = true;
    },
    endSpinner() {
      this.LoadingStatus = false;
    }
  },
  created() {
    bus.$on("start:spinner", this.startSpinner);
    bus.$on("end:spinner", this.endSpinner);
  },
  beforeDestroy() {
    bus.$off("start:spinner");
    bus.$off("end:spinner");
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 24px;
  height: 100vh;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
