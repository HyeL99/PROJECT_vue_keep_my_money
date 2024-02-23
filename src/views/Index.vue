<template>
  <div class="container">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
export default {
  name: "Index",
  components: {
    Header,
  },
};
</script>
