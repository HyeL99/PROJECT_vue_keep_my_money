<template>
  <div class="calendarPlace">
    <button>2024년 4월</button>
    <div class="calendar">
      <div v-for="(day, i) in dayList" :key="`dayList_${i}`" class="day">
        {{ day }}
      </div>
      <button
        v-for="(day, i) in days"
        :key="`days_${i}`"
        :class="`date${day.thisMonth ? '' : ' disabled'}${
          day.allDate === today ? ' today' : ''
        }${day.allDate === activeDate ? ' active' : ''}`"
        @click="setActiveDate(day.allDate)"
      >
        <span>{{ day.date }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Calendar",
  data() {
    return {
      dayList: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      today: this.$moment().format("YYYYMMDD"),
      // today: "20240704",
      days: [],
      activeDate: "20240204",
      historyList: null,
    };
  },
  computed: {
    ...mapState("dataStore", ["accountHistoryList", "cardHistoryList"]),
  },
  mounted() {
    console.log("today", this.today);
    this.getDays(this.today);
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
      const lastMonth = thisDay.subtract(1, "month");
      const lastMonthInfo = [
        lastMonth.format("YYYY"),
        lastMonth.format("MM"),
        lastMonth.format("DD"),
      ];
      const lastMonthLastDay = thisDay.subtract(1, "month").daysInMonth();
      const nextMonth = thisDay.add(1, "month");
      const nextMonthInfo = [
        nextMonth.format("YYYY"),
        nextMonth.format("MM"),
        nextMonth.format("DD"),
      ];

      for (let i = 0; i < firstDay; i++) {
        days.unshift({
          thisMonth: false,
          date: lastMonthLastDay - i,
          allDate: `${lastMonthInfo[0]}${lastMonthInfo[1]}${
            lastMonthLastDay - i
          }`,
        });
      }
      for (let i = 1; i <= lastDay; i++) {
        days.push({
          thisMonth: true,
          date: i,
          allDate: `${thisDayInfo[0]}${thisDayInfo[1]}${i < 10 ? "0" + i : i}`,
        });
      }

      for (let i = 1; days.length < 42; i++) {
        days.push({
          thisMonth: false,
          date: i,
          allDate: `${nextMonthInfo[0]}${nextMonthInfo[1]}${
            i < 10 ? "0" + i : i
          }`,
        });
      }
      this.days = days;
    },
    setActiveDate(date) {
      this.activeDate = date;
    },
    setHistory() {
      /* 여기부터 개발해야함 */
      return false;
    },
  },
};
</script>
