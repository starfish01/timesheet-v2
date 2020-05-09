<template>
  <div class="column">
    <h1 class="title has-text-centered">Details</h1>
    <span style="display:none">{{canContinue}}</span>
    <div class="columns">
      <div class="column is-6">
        <b-field label="Full Name">
          <b-input v-model="name" @change="someHandler()"></b-input>
        </b-field>
      </div>
      <div class="column is-6">
        <b-field label="Week Commencing">
          <b-datepicker
            :indicators="indicators"
            v-model="weekCommencing"
            :first-day-of-week="1"
            placeholder="Click to select..."
            icon="calendar-today"
            trap-focus
            :unselectable-days-of-week="[0,1,2,3,5,6]"
            :nearby-selectable-month-days="true"
          ></b-datepicker>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      weekCommencing: null,
      name: ""
    };
  },
  methods: {},
  props: {},
  methods: {},
  computed: {
    canContinue() {
      if (this.weekCommencing && this.name) {
        this.$store.dispatch("userData/updateUserDetails", {
          name: this.name,
          weekCommencing: this.weekCommencing
        });
        return true;
      }
      return false;
    },
    indicators() {
      // This is used to set the days dates
      //   if (!this.weekCommencing) {
      //     return;
      //   }
      //   _.forEach(this.dayData, (day, index) => {
      //     day.date = this.$moment(this.weekCommencing)
      //       .add(index, "days")
      //       .format("DD/MM/YYYY");
      //   });
    }
  }
};
</script>