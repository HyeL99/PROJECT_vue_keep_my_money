<template>
  <div class="inner calendarPlace">
    <div class="calTopBtns">
      <button @click="$emit('viewBeforeMonth')" class="prevBtn">이전달</button>
      <button @click="newSrchPeriodOpen = true">
        {{ activeYear }}년 {{ activeMonth }}월
      </button>
      <button class="todayBtn" @click="setPeriodToday">오늘</button>
      <button @click="$emit('viewAfterMonth')" class="nextBtn">다음달</button>
    </div>
    <template v-if="history">
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
          <span class="dots" v-if="history[day.allDate].list.length > 0">
            <span
              class="redDot"
              v-if="history[day.allDate].list.find((item) => item.useCode)"
              >red</span
            >
            <span
              class="greenDot"
              v-if="history[day.allDate].list.find((item) => !item.useCode)"
              >green</span
            >
          </span>
        </button>
      </div>
    </template>
    <div class="popup" v-if="newSrchPeriodOpen">
      <div class="card inner handleCard">
        <div class="card-header">
          <h2 class="card-title">조회기간 변경</h2>
        </div>
        <div class="handleCard-body">
          <div class="srchInputPlace">
            <select
              name="newSrchPeriodYear"
              id="newSrchPeriodYear"
              v-model="newSrchPeriod.year"
              class="nonScroll"
            >
              <option
                :value="thisYear - 50 + i"
                v-for="i in 100"
                :key="'year_before_' + i"
                :selected="newSrchPeriod.year === thisYear"
              >
                {{ thisYear - 50 + i }}
              </option>
            </select>
            <span>년</span>
            <select
              name="newSrchPeriodMonth"
              id="newSrchPeriodMonth"
              v-model="newSrchPeriod.month"
            >
              <option
                v-for="i in 12"
                :key="'month_' + i"
                :value="i"
                :selected="newSrchPeriod.month === i"
              >
                {{ i }}
              </option>
            </select>
            <span>월</span>
            <div class="card-bottoms"></div>
          </div>
          <button @click="srchNewPeriodCalendar" class="no_margin">조회</button>
          <button @click="cancelNewPeriod" class="no_margin color1">
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Calendar",
  props: {
    startDate: String,
    history: Object,
    historyTemp: Object,
    days: Array,
    activeDate: String,
    activeYear: String,
    activeMonth: String,
  },
  data() {
    return {
      dayList: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      today: this.$moment().format("YYYYMMDD"),
      newSrchPeriod: {
        year: Number(this.activeYear),
        month: Number(this.activeMonth),
      },
      newSrchPeriodOpen: false,
      thisYear: Number(this.$moment().format("YYYY")),
      // today: "20240704",
      // days: [],
      // historys: {},
      // historysTemp: {},
    };
  },
  computed: {
    ...mapState("dataStore", ["historyList"]),
  },
  mounted() {
    this.setActiveDate(this.startDate);
  },
  methods: {
    setPeriodToday() {
      this.newSrchPeriod = {
        year: Number(this.activeYear),
        month: Number(this.activeMonth),
      };
      this.$emit("viewToday");
    },
    cancelNewPeriod() {
      this.newSrchPeriod = {
        year: Number(this.activeYear),
        month: Number(this.activeMonth),
      };
      this.newSrchPeriodOpen = false;
    },
    setActiveDate(date) {
      this.$emit("setActiveDate", date);
    },
    srchNewPeriodCalendar() {
      const params = {
        year: this.newSrchPeriod.year.toString(),
        month: this.newSrchPeriod.month.toString(),
      };
      if (params.month.length === 1) params.month = "0" + params.month;
      this.$emit("onNewSrchPeriod", params);
      this.newSrchPeriodOpen = false;
    },
  },
};
</script>
