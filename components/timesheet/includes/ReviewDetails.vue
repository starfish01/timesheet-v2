<template>
  <div>
    <h4 class="title is-4">Days Worked</h4>
    <b-table
     :opened-detailed="defaultOpenedDetails"
    
     detail-key="day" ref="table" detailed :data="getDays(dayData, true)" :mobile-cards="true">
      <template slot-scope="props">
        <b-table-column field="day" label="Day">{{ props.row.day }}</b-table-column>
        <b-table-column field="data.start" label="Start">{{ props.row.data.start }}</b-table-column>
        <b-table-column field="data.end" label="Finish">{{ props.row.data.end }}</b-table-column>
        <b-table-column field="data.break_20" label="20 min">
          <fa :icon="['fas', 'check']" class="complete-tick" v-if="props.row.data.break_20" />
        </b-table-column>
        <b-table-column field="data.break_30" label="30 min">
          <fa :icon="['fas', 'check']" class="complete-tick" v-if="props.row.data.break_30" />
        </b-table-column>
      </template>

      <template slot="detail" slot-scope="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <h6 class="title is-6">Sites</h6>
              <p class="site-review-data"
                v-for="(item, index) in props.row.data.sites"
                :key="index"
              >Site: {{item.title}} <template v-if="item.timeSpent">- Hours: {{item.timeSpent}}</template></p>
            </div>
          </div>
        </article>
      </template>
    </b-table>

    <hr />

    <h4 class="title is-4">Days Off</h4>
    <b-table :data="getDays(dayData, false)" :mobile-cards="true">
      <template slot-scope="props">
        <b-table-column field="day" label="Day">{{ props.row.day }}</b-table-column>
        <b-table-column
          field="data.start"
          label="Reason"
        >{{ props.row.data.reason ? props.row.data.reason : 'Weekend' }}</b-table-column>
      </template>
    </b-table>
    <hr />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      columns: [{ field: "day", label: "First Name" }],
      defaultOpenedDetails: [] // ['Monday','Tueday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    };
  },
  methods: {
    getDays(data, isWorkDay) {
      const daysWorked = [];
      const nonWorkDays = [];
      data.forEach(day => {
        if (day.data.reason || day.data.reason === "") {
          nonWorkDays.push(day);
        } else {
          daysWorked.push(day);
        }
      });
      return isWorkDay ? daysWorked : nonWorkDays;
    }
  },

  computed: {
    ...mapGetters({
      dayData: "userData/dayData",
      canUserContinueDayDetailsStep: "userData/canUserContinueDayDetailsStep"
    })
  }
};
</script>
<style lang="scss" scoped>
h4.title.is-4, .title.is-6, .media-content .content .site-review-data {
  margin-bottom: 0;
}
.day-review-data {
  margin-bottom: 10px;
}
</style>