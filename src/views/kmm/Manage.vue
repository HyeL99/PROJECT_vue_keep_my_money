<template>
  <main>
    <div class="inner manageInner">
      <h2 class="main-header">자산관리</h2>
      <div class="card manage-card">
        <div class="card-header">
          <h3 class="card-title">계좌 관리</h3>
          <div class="card-buttons">
            <button>+</button>
          </div>
        </div>
        <ul v-if="accountList.length > 0">
          <li v-for="(item, i) in accountList" :key="`acc_${i}`">
            <span class="card-dot"></span>
            <span class="detail">{{ item.name }}</span>

          </li>
        </ul>
      </div>
      <div class="card manage-card">
        <div class="card-header">
          <h3 class="card-title">카드 관리</h3>
          <div class="card-buttons">
            <button>+</button>
          </div>
        </div>
        <ul v-if="cardList.length > 0">
          <li v-for="(item, i) in cardList" :key="`card_${i}`">
            <span class="card-dot"></span>
            <span class="detail">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Manage",
  computed: {
    ...mapState("dataStore", ["accountList", "cardList"]),
  },
};
</script>
