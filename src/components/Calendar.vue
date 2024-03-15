<template>
  <div class="inner calendarPlace">
    <button>{{ viewYear }}년 {{ viewMonth }}월</button>
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
  },
  data() {
    return {
      dayList: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      today: this.$moment().format("YYYYMMDD"),
      // today: "20240704",
      // days: [],
      activeInfo: {},
      // historys: {},
      // historysTemp: {},
      viewYear: this.$moment().format("YYYY"),
      viewMonth: this.$moment().format("MM"),
    };
  },
  computed: {
    ...mapState("dataStore", ["historyList"]),
  },
  mounted() {
    this.setActiveDate(this.startDate);
  },
  methods: {
    setActiveDate(date) {
      this.$emit("setActiveDate", date);
    },
  },
};
</script>
