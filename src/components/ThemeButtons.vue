<template>
  <div class="themeButtons">
    <button v-for="(color, i) in colors" :key="i" @click="setTheme(color)">
      {{ color }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ThemeButtons",
  data() {
    return {
      colors: ["red", "indigo", "green", "blue"],
    };
  },
  methods: {
    setTheme(color) {
      document.documentElement.setAttribute("data-theme", color);
    },
  },
};
</script>
