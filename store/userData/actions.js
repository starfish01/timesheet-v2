export default {
  updateUserDetails(context, payload) {
    context.commit('updateUserDetails', payload)
    context.commit('generateDayData')
  },
}
