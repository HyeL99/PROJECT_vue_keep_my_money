<template>
  <div class="signUpPopup">
    <template v-if="tempUserData">
      <div>
        <span>이름</span>
        <input type="text" disabled :value="tempUserData.name" />
      </div>
      <div>
        <span>이메일</span>
        <input type="text" disabled :value="tempUserData.email" />
      </div>
      <div>
        <span>닉네임</span>
        <input type="text" v-model.trim="inputUsername" />
      </div>
    </template>
    <button @click="doSignUp">확인</button>
    <button @click="cancelSignUp">취소</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export default {
  name: "SignUpPopup",
  data() {
    return {
      inputUsername: "",
    };
  },
  computed: {
    ...mapState("loginStore", ["tempUserData"]),
  },
  methods: {
    async doSignUp() {
      if (!this.tempUserData.name || !this.tempUserData.email) {
        alert("관리자에게 문의해주세요.");
        return false;
      }
      if (!this.inputUsername) {
        alert("닉네임을 입력해주세요!");
        return false;
      }

      const options = Object.assign({}, this.tempUserData, {
        username: this.inputUsername,
      });
      try {
        await setDoc(doc(db, "Users", options.email), options);
        this.$store.commit("loginStore/initUserData");
        this.$store.commit("loginStore/settingUserData", options);
        this.$emit("closePopup");
        this.$router.push({ name: "main" });
      } catch (err) {
        this.$router.push({ name: "error" });
        console.log(err);
      }
    },
    cancelSignUp() {
      this.$store.commit("loginStore/initUserData");
      this.$emit("closePopup");
    },
  },
};
</script>
