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
        <ThemeButtons :ohlyBtns="false" />
      </template>
    </div>
  </div>
</template>

<script>
import LOGO from "@/assets/svg/LOGO.vue";
import ThemeButtons from "@/components/ThemeButtons.vue";
import { mapState } from "vuex";
import GoogleLoginButton from "@/components/GoogleLoginButton.vue";
import { db } from "@/config/firebase";
import {
  onSnapshot,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

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
      const q_ctg = query(
        collection(db, "Settings"),
        where("type", "==", "category")
      );
      const q_his = query(
        collection(db, "HISTORY"),
        where("email", "==", this.userData.email)
      );
      const q_acc = query(
        collection(db, "INFO_account"),
        where("email", "==", this.userData.email)
      );
      const q_card = query(
        collection(db, "INFO_card"),
        where("email", "==", this.userData.email)
      );

      /* 초기 데이터 세팅 */
      const snapshot_his = getDocs(q_his);
      const snapshot_acc = getDocs(q_acc);
      const snapshot_card = getDocs(q_card);
      const snapshot_ctg = getDocs(q_ctg);
      const snapshotList = await Promise.all([
        snapshot_his,
        snapshot_acc,
        snapshot_card,
        snapshot_ctg,
      ]);
      const snapshotDataList = snapshotList.map((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => list.push(doc.data()));
        return list;
      });
      this.$store.commit("dataStore/settingData", {
        type: "his",
        data: snapshotDataList[0],
      });
      this.$store.commit("dataStore/settingData", {
        type: "acc",
        data: snapshotDataList[1],
      });
      this.$store.commit("dataStore/settingData", {
        type: "card",
        data: snapshotDataList[2],
      });
      this.$store.commit("dataStore/settingData", {
        type: "ctg",
        data: snapshotDataList[3],
      });
      this.$store.commit("dataStore/setDataState", true);
      localStorage.setItem(
        "color",
        document.documentElement.getAttribute("data-theme")
      );

      /* 데이터 변경 감지 */
      // eslint-disable-next-line no-unused-vars
      const unsubCategory = onSnapshot(q_ctg, (querySnapshot) => {
        const dataList = [];
        querySnapshot.forEach((doc) => dataList.push(doc.data()));
        this.$store.commit("dataStore/settingData", {
          type: "ctg",
          data: dataList,
        });
      });
      // eslint-disable-next-line no-unused-vars
      const unsubCardHisList = onSnapshot(q_his, (querySnapshot) => {
        const dataList = [];
        querySnapshot.forEach((doc) => dataList.push(doc.data()));
        this.$store.commit("dataStore/settingData", {
          type: "his",
          data: dataList,
        });
      });
      // eslint-disable-next-line no-unused-vars
      const unsubAccList = onSnapshot(q_acc, (querySnapshot) => {
        const dataList = [];
        querySnapshot.forEach((doc) => dataList.push(doc.data()));
        this.$store.commit("dataStore/settingData", {
          type: "acc",
          data: dataList,
        });
      });
      // eslint-disable-next-line no-unused-vars
      const unsubCardList = onSnapshot(q_card, (querySnapshot) => {
        const dataList = [];
        querySnapshot.forEach((doc) => dataList.push(doc.data()));
        this.$store.commit("dataStore/settingData", {
          type: "card",
          data: dataList,
        });
      });

      this.$router.push({ name: "calendar" }).then();
    },
  },
};
</script>
