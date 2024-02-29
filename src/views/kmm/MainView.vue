<template>
  <main>
    <Calendar
      @setActiveDate="setActiveDate"
      :activeDate="activeDate"
      :historyTemp="calendarHistoryTemp"
      :history="calendarHistory"
      :days="calendarDays"
    />
    <div class="calendarBottom">
      <h2 class="main-header">이달의 소비</h2>
    </div>
    <ViewHistory
      v-if="openViewHistoryCard"
      :date="activeDate"
      :info="activeInfo"
      @openHandlePopup="openHandleHistoryCard = true"
      @closeViewHistory="closeViewHistory"
    />
    <HandleHistory
      v-if="openHandleHistoryCard"
      :date="activeDate"
      @closePopup="openHandleHistoryCard = false"
      @complete="completeAddHistory"
    />
  </main>
</template>

<script>
import Calendar from "@/components/Calendar.vue";
import ViewHistory from "@/components/ViewHistory.vue";
import HandleHistory from "@/components/HandleHistory.vue";
import { mapState } from "vuex";

export default {
  name: "MainView",
  components: { HandleHistory, ViewHistory, Calendar },
  computed: {
    ...mapState("dataStore", ["historyList"]),
  },
  data() {
    return {
      today: this.$moment().format("YYYYMMDD"),
      calendarDays: [],
      activeDate: this.$moment().format("YYYYMMDD"),
      activeInfo: {},
      calendarHistory: {},
      calendarHistoryTemp: {},
      viewYear: this.$moment().format("YYYY"),
      viewMonth: this.$moment().format("MM"),
      openViewHistoryCard: false,
      openHandleHistoryCard: false,
      calendarLoadKey: 0,
    };
  },
  mounted() {
    this.openViewHistoryCard = false;
    this.openHandleHistoryCard = false;
    this.getDays(this.today);
    this.setHistory();
  },
  methods: {
    getDays(date) {
      const days = [];
      const thisDay = this.$moment(date);
      const thisDayInfo = [
        thisDay.format("YYYY"),
        thisDay.format("MM"),
        thisDay.format("DD"),
      ];
      const firstDay = this.$moment(
        `${thisDayInfo[0]}${thisDayInfo[1]}01`
      ).day();
      const lastDay = thisDay.daysInMonth();
      const lastMonth = this.$moment(date).subtract(1, "month");
      const lastMonthInfo = [
        lastMonth.format("YYYY"),
        lastMonth.format("MM"),
        lastMonth.format("DD"),
      ];
      const lastMonthLastDay = lastMonth.daysInMonth();
      const nextMonth = this.$moment(date).add(1, "month");
      const nextMonthInfo = [
        nextMonth.format("YYYY"),
        nextMonth.format("MM"),
        nextMonth.format("DD"),
      ];

      this.calendarHistory = {};

      for (let i = 0; i < firstDay; i++) {
        days.unshift({
          thisMonth: false,
          date: lastMonthLastDay - i,
          allDate: `${lastMonthInfo[0]}${lastMonthInfo[1]}${
            lastMonthLastDay - i
          }`,
        });
        this.calendarHistory[
          `${lastMonthInfo[0]}${lastMonthInfo[1]}${lastMonthLastDay - i}`
        ] = { list: [] };
      }
      for (let i = 1; i <= lastDay; i++) {
        days.push({
          thisMonth: true,
          date: i,
          allDate: `${thisDayInfo[0]}${thisDayInfo[1]}${i < 10 ? "0" + i : i}`,
        });
        this.calendarHistory[
          `${thisDayInfo[0]}${thisDayInfo[1]}${i < 10 ? "0" + i : i}`
        ] = { list: [] };
      }

      for (let i = 1; days.length < 42; i++) {
        days.push({
          thisMonth: false,
          date: i,
          allDate: `${nextMonthInfo[0]}${nextMonthInfo[1]}${
            i < 10 ? "0" + i : i
          }`,
        });
        this.calendarHistory[
          `${nextMonthInfo[0]}${nextMonthInfo[1]}${i < 10 ? "0" + i : i}`
        ] = { list: [] };
      }
      this.calendarDays = days;
      this.calendarHistoryTemp = this._.cloneDeep(this.calendarHistory);
    },
    setHistory() {
      console.log("히스토리 세팅");
      this.calendarHistory = this._.cloneDeep(this.calendarHistoryTemp);
      this.historyList.forEach((item) => {
        if (item.date in this.calendarHistory) {
          this.calendarHistory[item.date].list.push(item);
        }
      });
    },
    completeAddHistory() {
      this.setHistory();
      this.activeInfo = this.calendarHistory[this.activeDate];
      this.openHandleHistoryCard = false;
    },
    closeViewHistory() {
      this.activeDate = "";
      this.activeInfo = {};
      this.openViewHistoryCard = false;
    },
    setActiveDate(date) {
      if (this.activeDate === date) {
        this.activeDate = "";
        this.activeInfo = {};
        this.openViewHistoryCard = false;
      } else {
        this.activeDate = date;
        this.activeInfo = this.calendarHistory[date];
        this.openViewHistoryCard = true;
      }
    },
  },
};
</script>
