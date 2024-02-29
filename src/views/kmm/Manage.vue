<template>
  <main>
    <div class="inner manageInner">
      <h2 class="main-header">자산관리</h2>
      <div class="card manage-card">
        <div class="card-header">
          <h3 class="card-title">계좌 관리</h3>
          <div class="card-buttons">
            <button @click="openAssetCard('account')">+</button>
          </div>
        </div>
        <ul v-if="accountList.length > 0">
          <li v-for="(item, i) in accountList" :key="`acc_${i}`">
            <span class="card-dot"></span>
            <span class="detail">{{ item.name }} ({{ item.number }})</span>
          </li>
        </ul>
      </div>
      <div class="card manage-card">
        <div class="card-header">
          <h3 class="card-title">카드 관리</h3>
          <div class="card-buttons">
            <button @click="openAssetCard('card')">+</button>
          </div>
        </div>
        <ul v-if="cardList.length > 0" class="gridUl">
          <li v-for="(item, i) in cardList" :key="`card_${i}`">
            <span class="card-dot"></span>
            <span class="detail">{{ item.name }} ({{ item.number }})</span>
            <span class="more">목표사용금액 {{ item.bnfCost }}</span>
            <span class="more">청구서 기준일 {{ item.statementDate }}일</span>
          </li>
        </ul>
      </div>
    </div>
    <HandleAsset
      v-if="openHandleAssetCard"
      :type="assetCardType"
      @closeAssetCard="openHandleAssetCard = false"
      @complete="openHandleAssetCard = false"
    />
  </main>
</template>

<script>
import { mapState } from "vuex";
import HandleAsset from "@/components/HandleAsset.vue";

export default {
  name: "Manage",
  components: { HandleAsset },
  computed: {
    ...mapState("dataStore", ["accountList", "cardList"]),
  },
  data() {
    return {
      openHandleAssetCard: false,
      assetCardType: "",
    };
  },
  methods: {
    openAssetCard(type) {
      this.assetCardType = type;
      this.openHandleAssetCard = true;
    },
  },
};
</script>
