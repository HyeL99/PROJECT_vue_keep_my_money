<template>
  <footer :style="`grid-template-columns: repeat(${tabInfo.length}, 1fr)`">
    <router-link v-for="(item, i) in tabInfo" :to="item.link" :key="i">
      {{ item.name }}
    </router-link>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      tabInfo: [
        { name: "Tab1", link: "/tab1" },
        { name: "Tab2", link: "/tab2" },
        { name: "Tab3", link: "/tab3" },
        { name: "Tab4", link: "/tab4" },
        { name: "Tab5", link: "/tab5" },
      ],
    };
  },
};
</script>
