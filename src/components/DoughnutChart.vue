<template>
  <div id="doughnutChart">
    <Doughnut :chart-options="options" :chart-data="data" />
  </div>
</template>
<script>
import { Doughnut } from "vue-chartjs/legacy";
export default {
  name: "DoughnutChart",
  props: {
    options: Object,
    data: Object,
  },
  data() {
    return {
      type: "doughnut",
    };
  },
  components: {
    Doughnut,
  },
};
</script>
