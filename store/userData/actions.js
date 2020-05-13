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
}
