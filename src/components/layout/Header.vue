<template>
  <header>
    <div class="inner">
      <button
        v-for="(item, i) in tabs"
        :key="i"
        @click="$router.push({ name: item.name }).catch(() => {})"
      >
        <ICON_account
          :key="$route.name"
          :active="$route.name === 'account'"
          v-if="item.name === 'account'"
        />
        <ICON_calendar
          :key="$route.name"
          :active="$route.name === 'calendar'"
          v-else-if="item.name === 'calendar'"
        />
        <ICON_manage
          :key="$route.name"
          :active="$route.name === 'manage'"
          v-else-if="item.name === 'manage'"
        />
        <ICON_statistics
          :key="$route.name"
          :active="$route.name === 'statistics'"
          v-else-if="item.name === 'statistics'"
        />
      </button>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import ICON_account from "@/assets/svg/ICON_account.vue";
import ICON_calendar from "@/assets/svg/ICON_calendar.vue";
import ICON_manage from "@/assets/svg/ICON_manage.vue";
import ICON_statistics from "@/assets/svg/ICON_statistics.vue";

export default {
  name: "Header",
  components: { ICON_statistics, ICON_manage, ICON_calendar, ICON_account },
  computed: {
    ...mapState("loginStore", ["isLogin"]),
  },
  data() {
    return {
      tabs: [
        { name: "account" },
        { name: "calendar" },
        { name: "manage" },
        { name: "statistics" },
      ],
    };
  },
};
</script>
