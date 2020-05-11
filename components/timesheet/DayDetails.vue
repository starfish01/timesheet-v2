<template>
  <div class="column">
    <h1 class="title has-text-centered">Days Worked</h1>
    <section>
      <b-collapse
        class="card"
        animation="fade"
        v-for="(day, index) of dayData"
        :key="index"
        :open="isOpen == index"
        @open="isOpen = index"
      >
        <div slot="trigger" slot-scope="props" class="card-header" role="button">
          <p class="card-header-title">{{ day.day }} - {{day.date}}</p>
          <span class="card-header-icon">
            <fa :icon="['fas', 'check']" class="complete-tick" v-if="day.data" />
            <fa :icon="['fas', 'pen']" class="need-info" v-if="!day.data" />
          </span>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            <Details @dataWasSaved="moveOnToNextDay" :isWeekend="day.isWeekend" :day="day.day" :dayData="day.data" />
          </div>
        </div>
      </b-collapse>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Details from "@/components/timesheet/includes/Details";

export default {
  components: {
    Details
  },
  data() {
    return {
      isOpen: 0
    };
  },
  methods:{
    moveOnToNextDay() {
      this.isOpen += 1;
    }
  },
  computed: {
    ...mapGetters({
      dayData: "userData/dayData"
    })
  },
  props: {}
};
</script>

<style lang="scss" scoped>
.complete-tick {
  color: #7957d5;
}
.need-info {
  color: red;
}
</style>