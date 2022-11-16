require("dotenv").config({ path: "./config.env" });
var schedule = require("node-schedule");
const Actions = require("./actionService");

class AreaCenter {
  static createArea(area) {
    //create a job to execute the action
    var rule = new schedule.RecurrenceRule();
    if (area.action.name === "UniqueTimer") {
      rule.hour = area.action.args.time.substring(0, 2);
      rule.minute = area.action.args.time.substring(3, 5);
    }
    rule.second = [0, 10, 20, 30, 40, 50];
    schedule.scheduleJob(area._id, rule, async () => {
      console.log("execute action", area._id);
      await Actions(area);
    });
  }

  static deleteArea(_id) {
    console.log("delete area", _id);
    schedule.scheduledJobs[_id]?.cancel();
  }
}

module.exports = AreaCenter;

/*
after receiving the area with a post request, u need to call the createArea function
after receiving the area with a delete request, u need to call the deleteArea function
_id is the id of the user.area._id

{
  "actionType": 1,
  "reactionType": 1,
  "actionArgs": {
  },
  "reactionArgs": {
  },
  "time": "1 * * * * *"
}

*/
