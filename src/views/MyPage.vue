<template>
  <div>
    <button @click="doLogout">logout</button>
  </div>
</template>

<script>
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
export default {
  name: "MyPage",
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
  },
};
</script>
