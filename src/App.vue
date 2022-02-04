<template>
  <router-view></router-view>
</template>

<script>
import { setToken } from "./store/utils/auth.js";

export default {
  name: "App",
  mounted() {
    setToken(localStorage.getItem("MosotoPassport"));
  }
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "assets/scss/style";

.ql-container {
  font-family: "Poppins", sans-serif !important;
  font-size: 1rem !important;
}
.ql-editor {
  height: 100px !important;
}

.ql-editor ol,
.ql-editor ul {
  padding-left: 0 !important;
}
</style>
