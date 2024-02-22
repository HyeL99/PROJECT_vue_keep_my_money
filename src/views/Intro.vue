<template>
  <div class="introPage">
    <!--<button @click="test = !test">테스트 버튼</button>-->
    <LOGO class="logo" />
    <div class="bottomPlace">
      <p v-if="isLogin">데이터를 로딩중입니다 ..</p>
      <!--<p v-if="test">데이터를 로딩중입니다 ..</p>-->
      <template v-else>
        <google-login-button
          class="googleButton"
          text="구글로 시작하기"
          @loginComplete="getData()"
        />
        <ThemeButtons />
      </template>
    </div>
  </div>
</template>

<script>
import LOGO from "@/assets/svg/LOGO.vue";
import ThemeButtons from "@/components/ThemeButtons.vue";
import { mapState } from "vuex";
import GoogleLoginButton from "@/components/GoogleLoginButton.vue";
import { getDocsFromFB } from "@/config/firebase";

export default {
  name: "Home",
  components: { GoogleLoginButton, ThemeButtons, LOGO },
  data() {
    return {
      test: true,
    };
  },
  mounted() {
    if (this.isLogin) {
      this.getData();
    }
  },
  computed: {
    ...mapState("loginStore", ["isLogin", "userData"]),
  },
  methods: {
    async getData() {
      const accountList = await getDocsFromFB({path:`Users/${this.userData.email}/Accounts`});
      const cardList = await getDocsFromFB({path:`Users/${this.userData.email}/Cards`});
      const accountHistoryList = await getDocsFromFB({path:`History_account`, condition: ["email", "==", this.userData.email]});
      const cardHistoryList = await getDocsFromFB({path:`History_card`, condition: ["email", "==", this.userData.email]});
      console.log(this.userData.email, accountList, cardList, accountHistoryList, cardHistoryList);
    },
  },
};
</script>
