var schedule = require("node-schedule");
const processReaction = require("../reactionService");

class TestReaction {
    static async console(area) {
        console.log("TestAction called");
        await processReaction(area);
        schedule.scheduledJobs[area._id]?.cancel();
        await area.user.areas.pull(area._id);
        await area.user.save();
    }
}

module.exports = TestReaction;
