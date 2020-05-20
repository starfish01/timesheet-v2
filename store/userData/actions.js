export default {
  updateUserDetails(context, payload) {
    context.commit('updateUserDetails', payload)
    context.commit('generateDayData')
  },
  addDayData(context, payload) {
    context.commit('addDayData', payload)
  },
  updateConfirmationDetails(context, payload) {
    context.commit('changeConfirmationDetails', payload)
  },
  sendData({context, state}) {

    this.$axios.post('http://127.0.0.1:8000/api/add_timesheet', {
        'day_data': state,
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

}
