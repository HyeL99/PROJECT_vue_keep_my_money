<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import Header from "@/components/layout/Header.vue";
// eslint-disable-next-line no-unused-vars
import Footer from "@/components/layout/Footer.vue";
</script>

<style lang="scss">
@import "@/assets/style/main.scss";
</style>
