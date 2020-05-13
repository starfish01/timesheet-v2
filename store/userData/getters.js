export default {
  canUserContinueUserDetailsStep(state) {
    if (state.name && state.weekCommencing) {
      return true;
    }
    return false;
  },
  canUserContinueDayDetailsStep(state) {
    let canContinue = state.dayData.length;

    _.forEach(state.dayData, function (day) {
      if (day.data !== null) {
        canContinue -= 1;
      }
    });

    return canContinue
  },
  dayData(state) {
    return state.dayData;
  },
  canSubmitTimesheet(state) {
    if (state.signature && state.supervisor) {
      return true;
    }
    return false;
  }
}
