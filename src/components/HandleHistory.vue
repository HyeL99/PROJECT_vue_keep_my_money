<template>
  <div class="popup">
    <div class="card inner handleCard">
      <div class="card-header">
        <strong class="card-title"
          >{{ $moment(date).format("YYYY.MM.DD") }} 기록 추가</strong
        >
        <div class="card-buttons">
          <button @click="$emit('closePopup')">×</button>
        </div>
      </div>
      <div class="handleCard-body">
        <div class="typePart">
          <strong>분류</strong>
          <!--/* 분류 라벨작업부터 작업 시작 */-->
          <label for="type_1" :class="historyParams.useCode ? 'active' : ''">
            지출
          </label>
          <label for="type_2" :class="historyParams.useCode ? '' : 'active'">
            수입
          </label>
          <input
            type="radio"
            name="type"
            id="type_1"
            v-model="historyParams.useCode"
            :value="true"
          />
          <input
            type="radio"
            name="type"
            id="type_2"
            v-model="historyParams.useCode"
            :value="false"
          />
        </div>
        <div class="selectPart">
          <strong>카테고리</strong>
          <ICON_select_arrow />
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
        <div class="inputPart">
          <strong>설명</strong>
          <input type="text" v-model.trim="historyParams.detail" />
        </div>
        <div class="inputPart">
          <strong>{{ historyParams.useCode ? "지출금액" : "수입금액" }}</strong>
          <input
            type="text"
            @change="changeCost"
            @blur="changeCost"
            @focus="focusCost"
            v-model="historyParams.cost"
          />
        </div>
        <div class="selectPart">
          <strong>결제수단</strong>
          <ICON_select_arrow />
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
        <button @click="addHistory" v-if="mode === 'new'">추가</button>
        <button @click="editHistory" v-if="mode === 'edit'">수정</button>
        <button @click="deleteHistory" v-if="mode === 'edit'">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { v4 as uuid_v4 } from "uuid";
import ICON_select_arrow from "@/assets/svg/ICON_select_arrow.vue";

export default {
  name: "HandleHistory",
  components: { ICON_select_arrow },
  props: {
    date: String,
    mode: String,
    editProps: Object,
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
        email: "",
      },
      editHistoryTemp: {},
    };
  },
  computed: {
    ...mapState("dataStore", ["cardList", "accountList", "categoryList"]),
    assetList() {
      const cards = this.cardList.map((t) => {
        const item = this._.cloneDeep(t);
        item.name = `카드 - ${item.name}(${item.number})`;
        return item;
      });
      const accounts = this.accountList.map((t) => {
        const item = this._.cloneDeep(t);
        item.name = `계좌 - ${item.name}(${item.number})`;
        return item;
      });
      return [].concat(cards, accounts);
    },
  },
  mounted() {
    if (this.mode === "new") {
      this.historyParams = {
        id: "history",
        useCode: true,
        detail: "",
        cost: "",
        assetId: "",
        categoryId: "",
        date: this._.cloneDeep(this.date),
        email: this.$store.state.loginStore.userData.email,
      };
    } else if (this.mode === "edit") {
      this.historyParams = this._.cloneDeep(this.editProps);
      this.historyParams.cost = Number(
        this.historyParams.cost.replaceAll(/[^0-9]/g, "")
      ).toLocaleString("ko-KR");
      this.editHistoryTemp = this._.cloneDeep(this.historyParams);
    }
  },
  methods: {
    changeCost(e) {
      this.historyParams.cost = Number(
        e.target.value.replaceAll(/[^0-9]/g, "")
      ).toLocaleString("ko-KR");
    },
    focusCost(e) {
      this.historyParams.cost = e.target.value.replaceAll(/[^0-9]/g, "");
    },
    checkValidHistory() {
      let params = this._.cloneDeep(this.historyParams);
      if (params.categoryId === "") {
        alert("카테고리를 선택해주세요!");
        return false;
      }
      if (params.detail === "") {
        alert("설명을 입력해주세요!");
        return false;
      }
      if (params.cost === "" || Number(params.cost) === 0) {
        alert("지출금액을 입력해주세요!");
        return false;
      }
      if (params.assetId === "") {
        alert("결제수단을 선택해주세요!");
        return false;
      }
      return true;
    },
    async addHistory() {
      const validCheck = this.checkValidHistory();
      if (!validCheck) return false;
      const hisParams = this._.cloneDeep(this.historyParams);
      hisParams.cost = hisParams.cost.replaceAll(",", "");
      hisParams.id = "history_" + uuid_v4().replaceAll("-", "");

      await setDoc(doc(db, "HISTORY", hisParams.id), hisParams);
      this.$emit("complete");
    },
    async editHistory() {
      const validCheck = this.checkValidHistory();
      if (!validCheck) return false;
      let params = this._.cloneDeep(this.historyParams);
      const isEqual = this._.isEqual(this.historyParams, this.editHistoryTemp);
      if (isEqual) {
        alert("수정된 사항이 없습니다.");
      } else {
        params.cost = params.cost.replaceAll(",", "");
        await setDoc(doc(db, "HISTORY", params.id), params);
        alert("수정이 완료되었습니다.");
        this.$emit("complete");
      }
    },
    deleteHistory() {},
  },
};
</script>
