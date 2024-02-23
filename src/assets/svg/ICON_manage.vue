<template>
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_3_154)">
      <rect width="30" height="26" rx="5" fill="white" />
      <path d="M10 30V23H17L10 30Z" fill="white" />
      <rect x="4" y="4" width="22" height="18" rx="3" :fill="thisColor" />
      <rect x="5" y="5" width="20" height="16" rx="2" fill="white" />
      <rect x="5" y="10" width="7" height="1" :fill="thisColor" />
      <rect x="18" y="10" width="7" height="1" :fill="thisColor" />
      <path
        d="M19 10C19 11.0609 18.5786 12.0783 17.8284 12.8284C17.0783 13.5786 16.0609 14 15 14C13.9391 14 12.9217 13.5786 12.1716 12.8284C11.4214 12.0783 11 11.0609 11 10H12.0002C12.0002 10.7956 12.3162 11.5586 12.8788 12.1212C13.4414 12.6838 14.2044 12.9998 15 12.9998C15.7956 12.9998 16.5586 12.6838 17.1212 12.1212C17.6838 11.5586 17.9998 10.7956 17.9998 10H19Z"
        :fill="thisColor"
      />
      <rect x="5" y="7" width="20" height="1" :fill="thisColor" />
    </g>
    <defs>
      <clipPath id="clip0_3_154">
        <rect width="30" height="30" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
export default {
  name: "ICON_manage",
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
