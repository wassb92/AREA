var schedule = require("node-schedule");

class TestReaction {
    static async console(args) {
        console.log("TestReaction reaction");
        console.log(args);
        schedule.scheduledJobs[args._id]?.cancel();
        await args.user.areas.pull(args._id);
        await args.user.save();
    }
}

module.exports = TestReaction;
