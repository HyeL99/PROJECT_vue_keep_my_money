<template>
  <div class="card slideCard">
    <div class="card-header">
      <h2 class="card-title">{{ $moment(date).format("DD일") }}의 수입/지출</h2>
      <div class="card-buttons">
        <button @click="$emit('openHandlePopup')">+</button>
        <button>×</button>
      </div>
    </div>
    <ul v-if="info.list.length > 0">
      <li v-for="(item, i) in info.list" :key="i">
        <span :class="`card-dot ${item.useCode ? 'red' : 'green'}`">{{
          item.useCode ? "red" : "green"
        }}</span>
        <span class="detail">{{ item.detail }}</span>
        <span v-if="item.useCode" class="cost red">- {{ item.cost | comma }}</span>
        <span v-else class="cost green">+ {{ item.cost | comma }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ViewHistory",
  props: {
    date: String,
    info: Object,
  },
  filters: {
    comma(val) {
      if (typeof val != "undefined" && !isNaN(val)) {
        return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return 0;
      }
    },
  },
};
</script>
