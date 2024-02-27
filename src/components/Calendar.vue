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
        <span class="calendarDate">{{ day.date }}</span>
        <span class="dots" v-if="historys[day.allDate].list.length > 0">
          <span
            class="redDot"
            v-if="historys[day.allDate].list.find((item) => item.useCode)"
            >red</span
          >
          <span
            class="greenDot"
            v-if="historys[day.allDate].list.find((item) => !item.useCode)"
            >green</span
          >
        </span>
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
      activeDate: "",
      activeInfo: {},
      historys: {},
      historysTemp: {},
    };
  },
  computed: {
    ...mapState("dataStore", ["historyList"]),
  },
  mounted() {
    console.log("today", this.today);
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

      this.historys = {};

      for (let i = 0; i < firstDay; i++) {
        days.unshift({
          thisMonth: false,
          date: lastMonthLastDay - i,
          allDate: `${lastMonthInfo[0]}${lastMonthInfo[1]}${
            lastMonthLastDay - i
          }`,
        });
        this.historys[
          `${lastMonthInfo[0]}${lastMonthInfo[1]}${lastMonthLastDay - i}`
        ] = { list: [] };
      }
      for (let i = 1; i <= lastDay; i++) {
        days.push({
          thisMonth: true,
          date: i,
          allDate: `${thisDayInfo[0]}${thisDayInfo[1]}${i < 10 ? "0" + i : i}`,
        });
        this.historys[
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
        this.historys[
          `${nextMonthInfo[0]}${nextMonthInfo[1]}${i < 10 ? "0" + i : i}`
        ] = { list: [] };
      }
      this.days = days;
      this.historysTemp = Object.assign({}, this.historys);
    },
    setActiveDate(date) {
      if (this.activeDate === date) {
        this.activeDate = "";
        this.$emit("unSelected");
      } else {
        const activeInfo = this.historys[date];
        this.activeDate = date;
        console.log(activeInfo, date);
        this.$emit("selectDate", date, activeInfo);
      }
    },
    setHistory() {
      console.log("히스토리 세팅");
      this.historys = Object.assign({}, this.historysTemp);
      this.historyList.forEach((item) => {
        if (item.date in this.historys) {
          this.historys[item.date].list.push(item);
        }
      });
    },
  },
};
</script>
