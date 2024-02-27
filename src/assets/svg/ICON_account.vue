<template>
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="active ? 'active' : ''"
  >
    <g clip-path="url(#clip0_3_126)">
      <rect width="30" height="26" rx="5" fill="white" />
      <path d="M10 30V23H17L10 30Z" fill="white" />
      <path
        class="thisColor"
        d="M8 17C8 15.3431 9.34315 14 11 14H19C20.6569 14 22 15.3431 22 17V21H8V17Z"
        fill="#FF6666"
      />
      <circle cx="15" cy="9" r="4" fill="#FF6666" class="thisColor" />
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
};
</script>
,
