<template>
  <div class="card">
    <div class="card-header">
      <h2>21일의 수입/지출</h2>
      <button>+</button>
      <button>-</button>
    </div>
    <ul></ul>
  </div>
</template>

<script>
export default {
  name: "HandleHistory",
  props: {
    date: String,
    info: Object,
  },/* 여기서부터 개발 시작 */
};
</script>

<style scoped></style>
