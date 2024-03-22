<template>
  <main class="statisticsPage">
    <div class="inner nonScroll">
      <div class="topPlace">
        <div class="card">
          <h2 class="main-header">
            <strong>사용통계</strong>
            <span>
              <strong>|</strong>
              {{ srchStartDate | date }} ~ {{ srchEndDate | date }}
            </span>
          </h2>
          <!--          <h3>-->
          <!--            <strong>통계 기준일 | {{ userData.statsDate }}일</strong>-->
          <!--            <button>수정</button>-->
          <!--          </h3>-->
        </div>
      </div>
      <button class="statsSrchBtn">조회기간 수정</button>
      <DoughnutChart
        v-if="this.chartData.datasets[0].data.length > 0"
        :options="chartOption"
        :data="chartData"
        class="chartPlace"
      />
      <div class="card" v-if="this.chartData.datasets[0].data.length > 0">
        <div class="card-header">
          <h3 class="card-title">사용 금액</h3>
        </div>
        <ul class="gridUl">
          <template v-for="(item, i) in chartDataList">
            <li :key="i" v-if="item.totalCost > 0">
              <span
                class="card-dot"
                :style="`background-color: ${chartData.datasets[0].backgroundColor[i]}`"
              ></span>
              <span class="detail">{{ item.name }}</span>
              <span>{{ item.totalCost | comma }}원</span>
            </li>
          </template>
        </ul>
      </div>
      <div class="card noHisCard" v-else>
        <ul class="gridUl">
          <li>
            <span class="card-dot"></span>
            <span class="detail">사용 내역 없음</span>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import DoughnutChart from "@/components/DoughnutChart.vue";
import { mapState } from "vuex";

export default {
  name: "Statistics",
  components: { DoughnutChart },
  data() {
    return {
      today: this.$moment().format("YYYYMMDD"),
      thisMonth: this.$moment().format("MM"),
      srchStartDate: "",
      srchEndDate: "",
      backgroundColor: {
        red: [
          "#FF6666",
          "#FF6D6D",
          "#FF7474",
          "#FF7B7B",
          "#FF8282",
          "#FF8989",
          "#FE9090",
          "#FD9898",
          "#FD9F9F",
          "#FCA6A6",
          "#FCAEAE",
          "#FCBAB8",
          "#FDC6C1",
          "#FED2CA",
          "#FEDED3",
          "#FFEADD",
        ],
        purple: [
          "#7469B6",
          "#806FB9",
          "#8B75BC",
          "#967BBF",
          "#A282C3",
          "#AD88C6",
          "#B790C8",
          "#C298CA",
          "#CC9FCC",
          "#D7A7CF",
          "#E1AFD1",
          "#E7BAD5",
          "#EDC5D9",
          "#F3D0DD",
          "#F9DBE2",
          "#FFE6E6",
        ],
        blue: [
          "#008DDA",
          "#0D99DB",
          "#1AA5DD",
          "#27B1DF",
          "#34BDE0",
          "#41C9E2",
          "#5BCFE3",
          "#75D6E4",
          "#8EDCE4",
          "#A4E1E5",
          "#ACE2E1",
          "#C3E7E3",
          "#CEE9E2",
          "#DAEAE1",
          "#E9ECDF",
          "#F7EEDD",
        ],
        green: [
          "#1FAB89",
          "#2BB28D",
          "#3ABB93",
          "#46C298",
          "#55CB9D",
          "#62D2A2",
          "#6ED8A9",
          "#79DFAF",
          "#85E5B6",
          "#91ECBD",
          "#9DF3C4",
          "#A9F4CB",
          "#B4F6D2",
          "#C0F8D9",
          "#CBF9E0",
          "#D7FBE8",
        ],
        black: [
          "#000000",
          "#0E0E0E",
          "#1D1D1D",
          "#2A2A2A",
          "#393939",
          "#484848",
          "#5A5A5A",
          "#6B6B6B",
          "#7D7D7D",
          "#8F8F8F",
          "#A1A1A1",
          "#ACACAC",
          "#B7B7B7",
          "#C3C3C3",
          "#CFCFCF",
          "#DBDBDB",
        ],
        mix: [
          "#FF6666",
          "#008DDA",
          "#1FAB89",
          "#000000",
          "#7469B6",
          "#FF8989",
          "#41C9E2",
          "#62D2A2",
          "#484848",
          "#AD88C6",
          "#FCAEAE",
          "#ACE2E1",
          "#9DF3C4",
          "#A1A1A1",
          "#E1AFD1",
          "#FFEADD",
          "#F7EEDD",
          "#D7FBE8",
          "#DBDBDB",
          "#FFE6E6",
        ],
      },
      chartDataList: [],
      chartOption: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
            datalabels: {
              display: false,
            },
          },
        ],
      },
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
    date(val) {
      return val.replace(/(\d{4})(\d{2})(\d{2})/g, "$1.$2.$3");
    },
  },
  computed: {
    ...mapState("dataStore", ["historyList", "categoryList"]),
    ...mapState("loginStore", ["userData"]),
  },
  mounted() {
    this.srchEndDate = this.$moment().format("YYYYMMDD");
    const todayDate = this.$moment(this.srchEndDate).date();
    if (this.userData.statsDate <= todayDate) {
      this.srchStartDate = this.$moment(this.srchEndDate).format(
        `YYYYMM${this.userData.statsDate}`
      );
    } else {
      const lastMonthDate = this.$moment(this.srchEndDate).subtract(1, "month");
      if (lastMonthDate.daysInMonth() < this.userData.statsDate) {
        this.srchStartDate = lastMonthDate.format(
          `YYYYMM${lastMonthDate.daysInMonth()}`
        );
      } else {
        this.srchStartDate = lastMonthDate.format(
          `YYYYMM${this.userData.statsDate}`
        );
      }
    }

    this.setChartData();
  },
  methods: {
    setChartData() {
      console.log("실행");
      const categorys = {};
      const ctgList = [];
      this.categoryList.forEach((item) => {
        categorys[item.id] = { id: item.id, name: item.name, totalCost: 0 };
        ctgList.push({ id: item.id, name: item.name, totalCost: 0 });
      });
      this.historyList.forEach((item) => {
        if (
          this.$moment(item.date).isBetween(
            this.srchStartDate,
            this.srchEndDate
          )
        ) {
          if (item.useCode) {
            categorys[item.categoryId].totalCost += Number(item.cost);
          } else {
            categorys[item.categoryId].totalCost -= Number(item.cost);
          }
        }
      });
      ctgList.forEach((item) => {
        item.totalCost = categorys[item.id].totalCost;
      });
      const thisColor = document.documentElement.getAttribute("data-theme");
      this.chartDataList = ctgList.sort((a, b) => b.totalCost - a.totalCost);
      this.chartData.labels = this.chartDataList.map((item) => item.name);
      this.chartData.datasets[0].backgroundColor =
        this.backgroundColor[thisColor];
      this.chartData.datasets[0].data = this.chartDataList.map(
        (item) => item.totalCost
      );
      console.log(this.chartData.datasets[0].data);
    },
  },
};
</script>
