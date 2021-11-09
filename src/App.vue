<template>
  <router-view></router-view>
</template>

<script>
import { setToken } from "./store/utils/auth.js";

export default {
  name: "App",
  mounted() {
    setToken(localStorage.getItem("token"));
  }
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "assets/scss/style";
</style>
