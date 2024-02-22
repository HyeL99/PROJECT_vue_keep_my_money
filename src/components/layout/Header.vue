<template>
  <header>
    <RouterLink to="/" class="logo">Logo</RouterLink>
    <RouterLink to="/my" v-if="isLogin" class="profile">my</RouterLink>
    <RouterLink to="/login" v-else class="profile">login</RouterLink>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState("loginStore", ["isLogin"]),
  },
};
</script>
