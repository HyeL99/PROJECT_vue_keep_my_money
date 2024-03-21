<template>
  <div class="card slideCard viewHistoryCard">
    <div class="card-header">
      <h2 class="card-title">{{ $moment(date).format("DD일") }}의 수입/지출</h2>
      <div class="card-buttons">
        <button @click="$emit('openHandlePopup')">+</button>
        <button @click="$emit('closeViewHistory')">×</button>
      </div>
    </div>
    <ul v-if="info && info.list.length > 0" class="gridUl">
      <li v-for="(item, i) in info.list" :key="i">
        <button @click="$emit('openEditPopup', item)" class="grid_3">
          <span :class="`card-dot ${item.useCode ? 'red' : 'green'}`">{{
            item.useCode ? "red" : "green"
          }}</span>
          <span class="detail">{{ item.detail }}</span>
          <span v-if="item.useCode" class="cost red">
            - {{ item.cost | comma }}
          </span>
          <span v-else class="cost green">+ {{ item.cost | comma }}</span>
          <span class="more">
            {{ ctgObj[item.categoryId].name }} |
            {{ assetObj[item.assetId].name }}
            ({{ assetObj[item.assetId].number }})
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ViewHistory",
  props: {
    date: String,
    info: Object,
  },
  data() {
    return {
      ctgObj: {},
      assetObj: {},
    };
  },
  computed: {
    ...mapState("dataStore", ["categoryList", "cardList", "accountList"]),
  },
  created() {
    this.categoryList.forEach((item) => {
      this.ctgObj[item.id] = { name: item.name };
    });
    this.cardList.forEach((item) => {
      this.assetObj[item.id] = { name: item.name, number: item.number };
    });
    this.accountList.forEach((item) => {
      this.assetObj[item.id] = { name: item.name, number: item.number };
    });
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
