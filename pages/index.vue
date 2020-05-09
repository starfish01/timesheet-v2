<template>
  <section class="section">
    <div class="columns is-mobile">
      <div class="column">
        <section>
          <b-steps v-model="activeStep">
            <!-- //768 -->
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
                v-if="canUserContinue"
                :disabled="next.disabled"
                @click.prevent="next.action"
              >Next</b-button>
              <b-button v-if="!canUserContinue" disabled="true">Next</b-button>
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
      activeStep: 1,
      customNavigation: false,
      isProfileSuccess: false,
      position: null
    };
  },
  computed: {
    canUserContinue() {
      if (this.canUserContinueUserDetailsStep) {
        return true;
      }
      return false;
    },
    ...mapGetters({
      canUserContinueUserDetailsStep: "userData/canUserContinueUserDetailsStep"
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