<template>
  <main>
    <Calendar
      @selectDate="selectDate"
      @unSelected="unSelectedDate"
      :key="calendarLoadKey"
      :startDate="activeDate"
    />
    <ViewHistory
      v-if="openViewHistoryCard"
      :date="activeDate"
      :info="activeInfo"
      @openHandlePopup="openHandleHistoryCard = true"
    />
    <HandleHistory
      :date="activeDate"
      v-if="openHandleHistoryCard"
      @closePopup="openHandleHistoryCard = false"
      @complete="completeAddHistory"
    />
  </main>
</template>

<script>
import Calendar from "@/components/Calendar.vue";
import ViewHistory from "@/components/ViewHistory.vue";
import HandleHistory from "@/components/HandleHistory.vue";

export default {
  name: "MainView",
  components: { HandleHistory, ViewHistory, Calendar },
  data() {
    return {
      activeDate: this.$moment().format("YYYYMMDD"),
      activeInfo: {},
      openViewHistoryCard: false,
      openHandleHistoryCard: false,
      calendarLoadKey: 0,
    };
  },
  methods: {
    selectDate(date, activeInfo) {
      this.activeDate = date;
      this.activeInfo = activeInfo;
      this.openViewHistoryCard = true;
    },
    unSelectedDate() {
      this.activeDate = "";
      this.activeInfo = {};
      this.openViewHistoryCard = false;
    },
    completeAddHistory() {
      this.openHandleHistoryCard = false;
      this.calendarLoadKey++;
    },
  },
};
</script>
