<template>
  <section class="section">
    <div class="columns is-mobile">
      <div class="column">
        <section>
          <b-steps v-model="activeStep">
            <b-step-item step="1" label="Details">
              <UserDetails />
            </b-step-item>

            <b-step-item step="2" label="Days Worked" :type="{'is-success': isProfileSuccess}">
              <DayDetails />
            </b-step-item>

            <b-step-item step="3" label="Confirmation" disabled>
              <Confirmation />
            </b-step-item>

            <template slot="navigation" slot-scope="{previous, next}">
              <b-button :disabled="previous.disabled" @click.prevent="previous.action">Previous</b-button>
              <b-button
                v-if="canUserContinue && activeStep !== 2"
                :disabled="next.disabled"
                @click.prevent="next.action"
                @click="generateDayData()"
              >Next</b-button>
              <b-button v-if="!canUserContinue && activeStep !== 2" disabled="true">Next</b-button>

              <b-button v-if="canSubmitTimesheet">Submit</b-button>
              <b-button disabled="true" v-if="activeStep === 2 && !canSubmitTimesheet">Submit</b-button>

            </template>
          </b-steps>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import UserDetails from "@/components/timesheet/UserDetails";
import DayDetails from "@/components/timesheet/DayDetails";
import Confirmation from "@/components/timesheet/Confirmation";

export default {
  name: "HomePage",
  components: {
    UserDetails,
    DayDetails,
    Confirmation
  },
  data() {
    return {
      activeStep: 2,
      customNavigation: false,
      isProfileSuccess: false,
      position: null
    };
  },
  methods: {
    generateDayData() {}
  },
  computed: {
    canUserContinue() {
      if (this.activeStep === 0) {
        if (this.canUserContinueUserDetailsStep) {
          return true;
        }
        return false;
      }
      if (this.activeStep === 1) {
        if (this.canUserContinueDayDetailsStep === 0) {
          return true;
        }
        return false;
      }
    },
    ...mapGetters({
      canUserContinueUserDetailsStep: "userData/canUserContinueUserDetailsStep",
      canUserContinueDayDetailsStep: "userData/canUserContinueDayDetailsStep",
      canSubmitTimesheet: "userData/canSubmitTimesheet"
    })
  }
};
</script>
<style lang="scss" scopped>
@media screen and (max-width: 768px) {
  li.step-item.is-active {
    &:after {
      background: transparent !important;
      border-top: 4px dashed #dbdbdb;
    }
  }
}
</style>