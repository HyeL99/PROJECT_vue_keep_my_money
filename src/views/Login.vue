<template>
  <div>
    <p>Login</p>
    <GoogleLoginButton @openPopup="isPopupOpen = true" />
    <SignUpPopup v-if="isPopupOpen" @closePopup="isPopupOpen = false" />
  </div>
</template>

<script>
import GoogleLoginButton from "@/components/GoogleLoginButton.vue";
import SignUpPopup from "@/components/SignUpPopup.vue";

export default {
  name: "Login",
  components: { SignUpPopup, GoogleLoginButton },
  data() {
    return {
      isPopupOpen: true,
    };
  },
  methods: {},
};
</script>
