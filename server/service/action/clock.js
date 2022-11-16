const processReaction = require("../reactionService");
const schedule = require("node-schedule");

class Clock {
  static async UniqueTimer(area) {
    console.log("UniqueTimer called");
    await processReaction(area);
    const currentArea = schedule.scheduledJobs[area._id];
    if (currentArea) {
      currentArea.cancel();
    }
  }
}

module.exports = Clock;
