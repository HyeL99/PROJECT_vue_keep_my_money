<template>
  <main>
    <Calendar @selectDate="selectDate" />
    <HandleHistory :date="activeDate" :info="activeInfo" />
  </main>
</template>

<script>
import Calendar from "@/components/Calendar.vue";
import HandleHistory from "@/components/HandleHistory.vue";

export default {
  name: "MainView",
  components: { HandleHistory, Calendar },
  data() {
    return {
      activeDate: "",
      activeInfo: {},
    };
  },
  methods: {
    selectDate(date, activeInfo) {
      this.activeDate = date;
      this.activeInfo = activeInfo;
    },
  },
};
</script>
