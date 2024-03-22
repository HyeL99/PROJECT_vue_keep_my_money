<template>
  <button @click="doLogin">{{ text }}</button>
</template>

<script>
import { auth, provider, db } from "@/config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
export default {
  name: "GoogleLoginButton",
  props: {
    text: String,
  },
  methods: {
    doLogin() {
      signInWithPopup(auth, provider)
        .then(async (res) => {
          // const credential = GoogleAuthProvider.credentialFromResult(res);
          // const token = credential.accessToken;
          const user = res.user;
          const name = user.displayName;
          const email = user.email;

          const docRef = doc(db, "Users", email);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            this.$store.commit("loginStore/settingUserData", docSnap.data());
            this.$emit("loginComplete");
          } else {
            const statsDate = 1;
            const userData = { name, email, statsDate };
            await setDoc(doc(db, "Users", userData.email), userData);
            this.$store.commit("loginStore/initUserData");
            this.$store.commit("loginStore/settingUserData", userData);
            this.$emit("loginComplete");
          }
        })
        .catch((err) => {
          const errorCode = err.code;
          const errMsg = err.message;
          const email = err.customData?.email;
          const credential = GoogleAuthProvider.credentialFromError(err);
          console.log(errorCode, errMsg, email, credential);
        });
    },
  },
};
</script>
