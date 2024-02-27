<template>
  <main>
    <div class="inner myPageInner">
      <h2 class="main-header">계정 관리</h2>
      <div class="card accountCard">
        <p>
          <span>이름</span><span>{{ userData.name }}</span>
        </p>
        <p>
          <span>계정</span><span>{{ userData.email }}</span>
        </p>
        <button @click="doLogout">로그아웃</button>
        <button @click="$router.push({ name: 'secession' }).catch(() => {})">
          계정탈퇴
        </button>
      </div>
      <h2 class="main-header">테마</h2>
      <div class="card themeCard">
        <ThemeButtons :ohlyBtns="true" />
        <button @click="setColor()">적용</button>
      </div>
    </div>
  </main>
</template>

<script>
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { mapState } from "vuex";
import ThemeButtons from "@/components/ThemeButtons.vue";
export default {
  name: "MyPage",
  components: { ThemeButtons },
  computed: {
    ...mapState("loginStore", ["userData"]),
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteLeave(to, from, next) {
    if (
      localStorage.getItem("color") !==
      document.documentElement.getAttribute("data-theme")
    ) {
      const confirmRes = confirm(
        "테마를 적용하지 않았습니다.\n적용하시겠습니까?"
      );
      if (confirmRes) {
        localStorage.setItem(
          "color",
          document.documentElement.getAttribute("data-theme")
        );
      } else {
        const thisTheme = localStorage.getItem("color");
        document.documentElement.setAttribute("data-theme", thisTheme);
      }
    }
    next();
  },
  methods: {
    doLogout() {
      signOut(auth)
        .then(() => {
          this.$store.commit("loginStore/initUserData");
          this.$router.push({ name: "intro" });
        })
        .catch((err) => {
          console.log(err);
          this.$router.push({ name: "error" });
        });
    },
    setColor() {
      localStorage.setItem(
        "color",
        document.documentElement.getAttribute("data-theme")
      );
    },
  },
};
</script>
