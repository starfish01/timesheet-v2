export default {
  updateUserDetails(state, data) {
    state.name = data.name
    state.weekCommencing = data.weekCommencing
  },
  generateDayData(state) {
    const startDay = state.weekCommencing;
    state.dayData = [];

    for (let index = 0; index < 7; index++) {
      let day = this.$moment(startDay).add(index, "days").format('dddd');
      let date = this.$moment(startDay).add(index, "days").format("DD/MM/YYYY");
      state.dayData.push({
        date,
        day,
        data: null,
        isWeekend: (day === 'Saturday' || day === 'Sunday') ? true : false
      });
    }
  },
  addDayData(state, data) {
    const dayTitle = data.day;
    _.forEach(state.dayData, function (day) {
      if (dayTitle === day.day) {
        day.data = data.data;
      }
    });
  }
}
