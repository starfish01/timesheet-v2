export default {
  canUserContinueUserDetailsStep(state) {
    if (state.name && state.weekCommencing) {
      return true;
    }
    return false;
  },
}
