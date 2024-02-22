<template>
  <div class="container">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer v-if="$store.state.loginStore.isLogin" />
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
export default {
  name: "Index",
  components: {
    Header,
    Footer,
  },
};
</script>
