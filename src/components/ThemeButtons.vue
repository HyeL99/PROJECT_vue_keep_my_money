<template>
  <div class="themeButtons">
    <p v-if="!ohlyBtns">테마 선택</p>
    <button
      v-for="(color, i) in colors"
      :key="i"
      :class="thisColor === color ? 'active' : ''"
      @click="setTheme(color)"
    >
      {{ color }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ThemeButtons",
  props: {
    ohlyBtns: Boolean,
  },
  data() {
    const thisColor = document.documentElement.getAttribute("data-theme");
    return {
      thisColor: thisColor,
      colors: ["red", "indigo", "green", "blue"],
      actBtnIndex: 0,
    };
  },
  methods: {
    setTheme(color) {
      this.thisColor = color;
      document.documentElement.setAttribute("data-theme", color);
    },
  },
};
</script>
