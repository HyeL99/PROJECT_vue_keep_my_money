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
        <ul v-if="accountList.length > 0" class="gridUl">
          <li v-for="(item, i) in accountList" :key="`acc_${i}`">
            <button @click="editAssetCard(item, 'account')">
              <span class="card-dot"></span>
              <span class="detail">{{ item.name }} ({{ item.number }})</span>
            </button>
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
            <button @click="editAssetCard(item, 'card')" class="card-button">
              <span class="card-dot"></span>
              <span class="detail">{{ item.name }} ({{ item.number }})</span>
              <span class="more">목표사용금액 {{ item.bnfCost | comma }}</span>
              <span class="more">청구서 기준일 {{ item.statementDate }}일</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <HandleAsset
      v-if="openHandleAssetCard"
      :type="assetCardType"
      mode="new"
      @closeAssetCard="openHandleAssetCard = false"
      @complete="openHandleAssetCard = false"
    />
    <HandleAsset
      v-if="openEditAssetCard"
      :type="assetCardType"
      mode="edit"
      :edit-props="editAssetProps"
      @closeAssetCard="openEditAssetCard = false"
      @complete="openEditAssetCard = false"
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
  filters: {
    comma(val) {
      if (typeof val != "undefined" && !isNaN(val)) {
        return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return 0;
      }
    },
  },
  data() {
    return {
      openHandleAssetCard: false,
      assetCardType: "",
      openEditAssetCard: false,
      editAssetProps: {},
    };
  },
  methods: {
    openAssetCard(type) {
      this.assetCardType = type;
      this.openHandleAssetCard = true;
    },
    editAssetCard(props, type) {
      const params = this._.cloneDeep(props);
      params.type = type;
      this.editAssetProps = params;
      this.openEditAssetCard = true;
    },
  },
};
</script>
