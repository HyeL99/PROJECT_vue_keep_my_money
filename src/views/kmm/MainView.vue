<template>
  <main>
    <Calendar @selectDate="selectDate" @unSelected="unSelectedDate" />
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
      activeDate: "",
      activeInfo: {},
      openViewHistoryCard: false,
      openHandleHistoryCard: false,
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
  },
};
</script>
