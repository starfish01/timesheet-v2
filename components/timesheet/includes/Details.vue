<template>
  <div>
    <div class="block">
      <b-field label="Did you work this day?"></b-field>
      <b-radio v-model="workToday" name="name" native-value="Y">Yes</b-radio>
      <b-radio v-model="workToday" name="name" native-value="N">No</b-radio>
    </div>
    <template v-if="workToday === 'Y'">
      <div class="content">
        <form @submit.prevent>
          <div class="columns">
            <div class="column">
              <b-field
                label="Start Time"
                :type="showErrors ? 'is-danger' : ''"
                :message="showErrors ? 'This information is required' : ''"
              >
                <b-clockpicker
                  hour-format="12"
                  v-model="workingDayData.shift_start"
                  placeholder="Select a time..."
                  icon="clock"
                  editable
                ></b-clockpicker>
              </b-field>
            </div>
            <div class="column">
              <b-field
                label="End Time"
                :type="showErrors ? 'is-danger' : ''"
                :message="showErrors ? 'This information is required' : ''"
              >
                <b-clockpicker
                  hour-format="12"
                  v-model="workingDayData.shift_end"
                  placeholder="Select a time..."
                  icon="clock"
                  editable
                ></b-clockpicker>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-3">
              <b-field
                label="20 Min Break"
                :type="showErrors ? 'is-danger' : ''"
                :message="showErrors ? 'This information is required' : ''"
              >
                <b-checkbox v-model="workingDayData.break_20"></b-checkbox>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field
                label="30 Min Break"
                :type="showErrors ? 'is-danger' : ''"
                :message="showErrors ? 'This information is required' : ''"
              >
                <b-checkbox v-model="workingDayData.break_30"></b-checkbox>
              </b-field>
            </div>
          </div>
          <div class="columns" v-for="(site, index) in workingDayData.sites" :key="index">
            <div class="column is-6">
              <b-field
                label="Site"
                :type="(showErrors && index === 0) ? 'is-danger' : ''"
                :message="(showErrors && index === 0) ? 'This information is required' : ''"
              >
                <b-input v-model="site.title"></b-input>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Hours">
                <b-input v-model="site.timeSpent"></b-input>
              </b-field>
            </div>
            <div class="column is-3 site buttons">
              <template v-if="(index + 1) === workingDayData.sites.length">
                <b-button
                  :class="[index === 0 ? 'end' : '', (showErrors && index === 0) ? 'error-active' : '']"
                  type
                  icon-right="plus"
                  @click="addSite()"
                />
                <b-button
                  v-if="index !== 0"
                  type="is-danger"
                  icon-right="delete"
                  @click="removeSite(index)"
                />
              </template>
            </div>
          </div>

          <b-button @click="saveWorkDay">Save</b-button>
        </form>
      </div>
    </template>

    <template v-if="workToday === 'N' && workToday !== null">
      <form @submit.prevent>
        <b-field
          :type="showErrors ? 'is-danger' : ''"
          :message="showErrors ? 'This information is required' : ''"
          label="Reason"
          v-if="!isWeekend"
        >
          <b-input v-model="nonWorkingDayData.reason" maxlength="200" type="textarea"></b-input>
        </b-field>
        <b-button @click="saveNonWorkDay">Save</b-button>
      </form>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    isWeekend: Boolean,
    day: String,
    dayData: Object
  },
  data() {
    return {
      workToday: null,
      showErrors: false,
      nonWorkingDayData: {
        reason: ""
      },
      workingDayData: {
        shift_start: null,
        shift_end: null,
        start: null,
        end: null,
        break_20: false,
        break_30: false,
        sites: [
          {
            title: "",
            timeSpent: ""
          }
        ]
      }
    };
  },
  methods: {
    saveNonWorkDay() {
      if (!this.nonWorkingDayData.reason && !this.isWeekend) {
        // throw Error
        this.showErrors = true;
        return;
      }
      this.$store.dispatch("userData/addDayData", {
        data: this.nonWorkingDayData,
        day: this.day
      });
      this.$emit('dataWasSaved');
      return;
    },
    saveWorkDay() {
      if (
        !this.workingDayData.shift_start ||
        !this.workingDayData.shift_end ||
        !this.workingDayData.sites[0].title
      ) {
        // throw error
        this.showErrors = true;
        return;
      }
      
      this.workingDayData.start = this.$moment(this.workingDayData.shift_start).format('HH:mm');
      this.workingDayData.end = this.$moment(this.workingDayData.shift_end).format('HH:mm');
      
      this.$store.dispatch("userData/addDayData", {
        data: this.workingDayData,
        day: this.day
      });
      this.$emit('dataWasSaved');
      return;
    },
    addSite() {
      this.workingDayData.sites.push({
        title: "",
        timeSpent: ""
      });
    },
    removeSite(index) {
      this.workingDayData.sites.splice(index, 1);
    }
  },
  // computed: {
  //   populateData() {
  //     if (!this.dayData) {
  //       return;
  //     }
  //     if (this.dayData["reason"] in obj) {
  //       this.workToday = "N";
  //       this.nonWorkingDayData.reason = this.dayData.reason;
  //     }
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.column.is-3.site.buttons {
  margin-top: auto;
  margin-bottom: 0;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  .end {
    margin-left: 0;
    margin-right: auto;
    &.error-active {
      margin-bottom: 1.9rem;
    }
  }
}
</style>