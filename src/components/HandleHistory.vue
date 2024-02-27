<template>
  <div class="popup">
    <div class="card handleHistoryCard">
      <div class="card-header">
        <strong class="card-title">{{$moment(date).format("YYYY.MM.DD")}} 기록 추가</strong>
        <div class="card-buttons">
          <button @click="$emit('closePopup')">×</button>
        </div>
      </div>
      <div>
        <div>
          <strong>분류</strong>
          /* 분류 라벨작업부터 작업 시작 */
          <input type="radio" name="kind" id="kind_1">
          <input type="radio" name="kind" id="kind_2">
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HandleHistory",
  props: {
    date: String,
  },
  data(){
    return {
      historyParams: {
        id: "hisorty"
      },
    };
  },
};
</script>
