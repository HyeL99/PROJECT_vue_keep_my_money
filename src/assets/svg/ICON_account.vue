<template>
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_3_126)">
      <rect width="30" height="26" rx="5" fill="white" />
      <path d="M10 30V23H17L10 30Z" fill="white" />
      <path
        d="M8 17C8 15.3431 9.34315 14 11 14H19C20.6569 14 22 15.3431 22 17V21H8V17Z"
        :fill="thisColor"
      />
      <circle cx="15" cy="9" r="4" :fill="thisColor" />
    </g>
    <defs>
      <clipPath id="clip0_3_126">
        <rect width="30" height="30" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
export default {
  name: "ICON_account",
  props: {
    active: Boolean,
  },
  data() {
    return {
      thisColor: "#a5a5a5",
    };
  },
  mounted() {
    if (this.active) {
      switch (localStorage.getItem("color")) {
        case "red":
          this.thisColor = "#FF6666";
          break;
        case "indigo":
          this.thisColor = "#424874";
          break;
        case "blue":
          this.thisColor = "#769FCD";
          break;
        case "green":
          this.thisColor = "#99BC85";
          break;
        default:
          this.thisColor = "#000";
      }
    } else {
      this.thisColor = "#a5a5a5";
    }
  },
};
</script>
,
