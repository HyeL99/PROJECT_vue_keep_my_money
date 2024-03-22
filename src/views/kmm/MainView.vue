<template>
  <main>
    <Calendar
      @setActiveDate="setActiveDate"
      :activeDate="activeDate"
      :historyTemp="calendarHistoryTemp"
      :history="calendarHistory"
      :days="calendarDays"
    />
    <div class="calendarBottom nonScroll inner">
      <h2 class="main-header">{{ Number(viewMonth) }}월의 소비</h2>
      <section>
        <article>
          <div class="articleHeader">
            <span class="left">사용금액</span>
            <h3>카드</h3>
            <span class="right">목표금액</span>
          </div>
          <div v-for="(item, i) in cardList" :key="`card_${i}`" class="costBar">
            <strong>{{ item.name }} ({{ item.number }})</strong>
            <div class="barContainer" v-if="assets[item.id]">
              <span class="bnfCostBar"></span>
              <strong class="bnfCost">{{ item.bnfCost | comma }}</strong>
              <span
                class="useCostBar"
                :style="`width: calc(100% * ${assets[item.id].totalCost} / ${
                  item.bnfCost
                })`"
              ></span>
              <strong class="useCost">{{
                assets[item.id].totalCost | comma
              }}</strong>
            </div>
          </div>
        </article>
        <article>
          <div class="articleHeader">
            <span class="left">지출금액</span>
            <h3>계좌</h3>
            <span class="right">수입금액</span>
          </div>
          <div
            v-for="(item, i) in accountList"
            :key="`acc_${i}`"
            class="costBar"
          >
            <strong>{{ item.name }} ({{ item.number }})</strong>
            <div class="barContainer" v-if="assets[item.id]">
              <span class="bnfCostBar"></span>
              <strong class="bnfCost">{{
                assets[item.id].totalGetCost | comma
              }}</strong>
              <span
                v-if="assets[item.id]"
                class="useCostBar"
                :style="`width: calc(100% * ${assets[item.id].totalUseCost} / ${
                  assets[item.id].totalUseCost + assets[item.id].totalGetCost
                })`"
              ></span>
              <strong class="useCost">{{
                assets[item.id].totalUseCost | comma
              }}</strong>
            </div>
          </div>
        </article>
      </section>
    </div>
    <ViewHistory
      v-if="openViewHistoryCard"
      :date="activeDate"
      :info="activeInfo"
      @openHandlePopup="openHandleHistoryCard = true"
      @closeViewHistory="closeViewHistory"
      @openEditPopup="openEditPopup"
    />
    <HandleHistory
      v-if="openHandleHistoryCard"
      :date="activeDate"
      mode="new"
      @closePopup="openHandleHistoryCard = false"
      @complete="completeAddHistory"
    />
    <HandleHistory
      v-if="openEditHistoryCard"
      :date="activeDate"
      :edit-props="editHistoryProps"
      mode="edit"
      @closePopup="openEditHistoryCard = false"
      @complete="completeEditHistory"
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
    ...mapState("dataStore", ["historyList", "accountList", "cardList"]),
  },
  data() {
    return {
      today: this.$moment().format("YYYYMMDD"),
      // today: "20240212",
      calendarDays: [],
      activeDate: this.$moment().format("YYYYMMDD"),
      // activeDate: "20240212",
      activeInfo: {},
      calendarHistory: {},
      calendarHistoryTemp: {},
      viewYear: this.$moment().format("YYYY"),
      viewMonth: this.$moment().format("MM"),
      // viewMonth: "02",
      openViewHistoryCard: false,
      openHandleHistoryCard: false,
      openEditHistoryCard: false,
      calendarLoadKey: 0,
      assets: {},
      editHistoryProps: {},
    };
  },
  filters: {
    comma(val) {
      if (typeof val != "undefined" && !isNaN(val)) {
        return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return 0;
      }
    },
  },
  mounted() {
    this.openViewHistoryCard = false;
    this.openHandleHistoryCard = false;
    this.getDays(this.today);
    this.setHistory();
  },
  methods: {
    openEditPopup(props) {
      this.editHistoryProps = this._.cloneDeep(props);
      this.openEditHistoryCard = true;
    },
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
      this.assets = {};
      this.accountList.forEach((item) => {
        this.assets[item.id] = { list: [] };
      });
      this.cardList.forEach((item) => {
        this.assets[item.id] = { list: [] };
      });
      this.calendarHistory = this._.cloneDeep(this.calendarHistoryTemp);
      this.historyList.forEach((item) => {
        if (item.date in this.calendarHistory) {
          this.calendarHistory[item.date].list.push(item);
        }
        if (this.$moment(item.date).format("MM") === this.viewMonth) {
          this.assets[item.assetId].list.push(item);
        }
      });

      this.cardList.forEach((item) => {
        let totalCost = 0;
        this.assets[item.id].list.forEach((item) => {
          if (item.useCode) {
            totalCost += Number(item.cost);
          } else {
            totalCost -= Number(item.cost);
          }
        });
        this.assets[item.id].totalCost = totalCost;
      });
      this.accountList.forEach((item) => {
        let totalUseCost = 0;
        let totalGetCost = 0;
        this.assets[item.id].list.forEach((item) => {
          if (item.useCode) {
            totalUseCost += Number(item.cost);
          } else {
            totalGetCost += Number(item.cost);
          }
        });
        this.assets[item.id].totalUseCost = totalUseCost;
        this.assets[item.id].totalGetCost = totalGetCost;
      });
    },
    completeAddHistory() {
      this.setHistory();
      this.activeInfo = this.calendarHistory[this.activeDate];
      this.openHandleHistoryCard = false;
    },
    completeEditHistory() {
      this.setHistory();
      this.activeInfo = this.calendarHistory[this.activeDate];
      this.openEditHistoryCard = false;
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
