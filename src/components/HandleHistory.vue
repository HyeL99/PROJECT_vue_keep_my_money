<template>
  <div class="popup">
    <div class="card handleHistoryCard">
      <div class="card-header">
        <strong class="card-title"
          >{{ $moment(date).format("YYYY.MM.DD") }} 기록 추가</strong
        >
        <div class="card-buttons">
          <button @click="$emit('closePopup')">×</button>
        </div>
      </div>
      <div class="handleHistoryCard-body">
        <div class="kind">
          <strong>분류</strong>
          <!--/* 분류 라벨작업부터 작업 시작 */-->
          <label for="kind_1" :class="historyParams.useCode ? 'active' : ''">
            지출
          </label>
          <label for="kind_2" :class="historyParams.useCode ? '' : 'active'">
            수입
          </label>
          <input
            type="radio"
            name="kind"
            id="kind_1"
            v-model="historyParams.useCode"
            :value="true"
          />
          <input
            type="radio"
            name="kind"
            id="kind_2"
            v-model="historyParams.useCode"
            :value="false"
          />
        </div>
        <div class="category">
          <strong>카테고리</strong>
          <select
            name="categorySelect"
            id="categorySelect"
            v-model="historyParams.categoryId"
          >
            <option value="">미분류</option>
            <option v-for="(item, i) in categoryList" :key="i" :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="detail">
          <strong>설명</strong>
          <input type="text" v-model.trim="historyParams.detail" />
        </div>
        <div class="cost">
          <strong>{{ historyParams.useCode ? "지출금액" : "수입금액" }}</strong>
          <input
            type="text"
            @change="changeCost"
            v-model="historyParams.cost"
          />
        </div>
        <div class="assetId">
          <strong>결제수단</strong>
          <select
            name="assetIdSelect"
            id="assetIdSelect"
            v-model="historyParams.assetId"
          >
            <option value="">결제수단 선택</option>
            <option v-for="(item, i) in assetList" :key="i" :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <button @click="addHistory">추가</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { v4 as uuid_v4 } from "uuid";

export default {
  name: "HandleHistory",
  props: {
    date: String,
  },
  data() {
    return {
      historyParams: {
        id: "history",
        useCode: true,
        detail: "",
        cost: "",
        assetId: "",
        categoryId: "",
        date: this.date,
        email: this.$store.state.loginStore.userData.email,
      },
    };
  },
  computed: {
    ...mapState("dataStore", ["cardList", "accountList", "categoryList"]),
    assetList() {
      const cards = this.cardList.map((t) => {
        const item = Object.assign({}, t);
        item.name = "카드 - " + item.name;
        return item;
      });
      const accounts = this.accountList.map((t) => {
        const item = Object.assign({}, t);
        item.name = "계좌 - " + item.name;
        return item;
      });
      return [].concat(cards, accounts);
    },
  },
  methods: {
    changeCost(e) {
      this.historyParams.cost = Number(
        e.target.value.replaceAll(/[^0-9]/g, "")
      ).toLocaleString("ko-KR");
    },
    async addHistory() {
      if (this.historyParams.categoryId === "") {
        alert("카테고리를 선택해주세요!");
        return false;
      }
      if (this.historyParams.detail === "") {
        alert("설명을 입력해주세요!");
        return false;
      }
      if (this.historyParams.cost === "") {
        alert("지출금액을 입력해주세요!");
        return false;
      }
      if (this.historyParams.assetId === "") {
        alert("결제수단을 선택해주세요!");
        return false;
      }
      const hisParams = Object.assign({}, this.historyParams);
      hisParams.cost = hisParams.cost.replaceAll(",", "");
      hisParams.id = "history_" + uuid_v4().replaceAll("-", "");

      await setDoc(doc(db, "HISTORY", hisParams.id), hisParams);
      this.$emit("complete");
    },
  },
};
</script>
