<template>
  <div class="popup">
    <div class="card inner periodCard">
      <div class="card-header">
        <h2 class="card-title">조회기간 수정</h2>
        <div class="card-buttons">
          <button @click="$emit('closeHandleCard')">×</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HandleSrchPeriod",
};
</script>
