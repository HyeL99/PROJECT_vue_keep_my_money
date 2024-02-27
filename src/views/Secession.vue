<template>
  <div class="secessionPage">
    <LOGO class="logo" />
    <p>
      탈퇴시 모든 데이터가 삭제되며<br />
      복구가 불가능합니다.<br />
      <br />
      <span>탈퇴하시겠습니까?</span>
    </p>
    <div class="sc_buttons">
      <button @click="doSecession">탈퇴</button>
      <button @click="cancel">취소하기</button>
    </div>
  </div>
</template>

<script>
import LOGO from "@/assets/svg/LOGO.vue";

export default {
  name: "Secession",
  components: { LOGO },
  methods: {
    doSecession() {},
    cancel() {
      this.$router.push({ name: "account" }).catch(() => {});
    },
  },
};
</script>
