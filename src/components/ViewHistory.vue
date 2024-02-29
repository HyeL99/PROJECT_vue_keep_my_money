<template>
  <div class="card slideCard viewHistoryCard">
    <div class="card-header">
      <h2 class="card-title">{{ $moment(date).format("DD일") }}의 수입/지출</h2>
      <div class="card-buttons">
        <button @click="$emit('openHandlePopup')">+</button>
        <button
          @click="$emit('openHandlePopup')"
          v-if="info && info.list.length > 0"
        >
          <ICON_edit />
        </button>
        <button @click="$emit('closeViewHistory')">×</button>
      </div>
    </div>
    <ul v-if="info && info.list.length > 0">
      <li v-for="(item, i) in info.list" :key="i">
        <span :class="`card-dot ${item.useCode ? 'red' : 'green'}`">{{
          item.useCode ? "red" : "green"
        }}</span>
        <span class="detail">{{ item.detail }}</span>
        <span v-if="item.useCode" class="cost red">
          - {{ item.cost | comma }}
        </span>
        <span v-else class="cost green">+ {{ item.cost | comma }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import ICON_edit from "@/assets/svg/ICON_edit.vue";

export default {
  name: "ViewHistory",
  components: { ICON_edit },
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
