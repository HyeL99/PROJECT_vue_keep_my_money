<template>
  <div class="popup">
    <div class="card handleCard">
      <div class="card-header">
        <h2 class="card-title">자산 추가</h2>
        <div class="card-buttons">
          <button @click="$emit('closeAssetCard')">×</button>
        </div>
      </div>
      <div class="handleCard-body">
        <div class="typePart">
          <strong>분류</strong>
          <!--/* 분류 라벨작업부터 작업 시작 */-->
          <label
            for="asset_type_1"
            :class="assetParams.type === 'account' ? 'active' : ''"
          >
            계좌
          </label>
          <label
            for="asset_type_2"
            :class="assetParams.type === 'card' ? 'active' : ''"
          >
            카드
          </label>
          <input
            type="radio"
            name="asset_type"
            id="asset_type_1"
            v-model="assetParams.type"
            value="account"
            disabled="disabled"
          />
          <input
            type="radio"
            name="asset_type"
            id="asset_type_2"
            v-model="assetParams.type"
            value="card"
            disabled="disabled"
          />
        </div>
        <div class="inputPart">
          <strong v-if="assetParams.type === 'account'">계좌명</strong>
          <strong v-if="assetParams.type === 'card'">카드명</strong>
          <input type="text" v-model="assetParams.name" />
        </div>
        <div class="inputPart">
          <strong>구분번호</strong>
          <input
            type="number"
            maxlength="4"
            :placeholder="
              assetParams.type === 'account'
                ? placeholder.account
                : placeholder.card
            "
            v-model="assetParams.number"
            @input="numberInput"
          />
        </div>
        <div class="selectPart long" v-if="assetParams.type === 'card'">
          <strong>명세서 기준일</strong>
          <select
            name="statementDate"
            id="statementDate"
            v-model="assetParams.statementDate"
          >
            <option v-for="i in 31" :value="i" :key="i">{{ i }}일</option>
          </select>
          <span class="clarify">ex. 25일 선택시 11/25 ~ 12/24 집계</span>
        </div>
        <div class="inputPart long" v-if="assetParams.type === 'card'">
          <strong>목표 혜택금액</strong>
          <input
            type="text"
            @change="changeCost"
            v-model="assetParams.bnfCost"
          />
        </div>
        <button @click="addAsset">추가</button>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuid_v4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export default {
  name: "HandleAsset",
  props: {
    type: String,
  },
  data() {
    return {
      assetParams: {
        type: "account",
        name: "",
        number: "",
        statementDate: 1,
        bnfCost: "",
      },
      placeholder: {
        account: "계좌번호 뒷자리 4자리",
        card: "카드번호 뒷자리 4자리",
      },
    };
  },
  mounted() {
    this.assetParams.type = this.type;
  },
  methods: {
    changeCost(e) {
      this.assetParams.bnfCost = Number(
        e.target.value.replaceAll(/[^0-9]/g, "")
      ).toLocaleString("ko-KR");
    },
    numberInput(e) {
      this.assetParams.number = e.target.value.substr(0, 4);
    },
    async addAsset() {
      let params = this._.cloneDeep(this.assetParams);
      params.email = this.$store.state.loginStore.userData.email;
      if (params.type === "account") {
        if (params.name === "") {
          alert("계좌명을 입력해주세요!");
          return false;
        }
        if (params.number === "") {
          alert("계좌 구분번호를 입력해주세요!");
          return false;
        }
        if (params.number.length !== 4) {
          alert("계좌 구분번호는 4글자 입력해주세요!");
          return false;
        }
        params.id = "account_" + uuid_v4().replaceAll("-", "");
        const { id, email, name, number } = params;
        await setDoc(doc(db, "INFO_account", params.id), {
          id,
          email,
          name,
          number,
        });
        this.$emit("complete");
      } else if (params.type === "card") {
        if (params.name === "") {
          alert("카드명을 입력해주세요!");
          return false;
        }
        if (params.number === "") {
          alert("카드 구분번호를 입력해주세요!");
          return false;
        }
        if (params.number.length !== 4) {
          alert("카드 구분번호는 4글자 입력해주세요!");
          return false;
        }
        if (params.bnfCost === "" || Number(params.bnfCost) === 0) {
          alert("목표 혜택금액을 입력해주세요!");
          return false;
        }
        params.bnfCost = params.bnfCost.replaceAll(",", "");
        params.id = "card_" + uuid_v4().replaceAll("-", "");
        const { id, email, name, number, statementDate, bnfCost } = params;
        await setDoc(doc(db, "INFO_card", params.id), {
          id,
          email,
          name,
          number,
          statementDate,
          bnfCost,
        });
        this.$emit("complete");
      }
    },
  },
};
</script>
