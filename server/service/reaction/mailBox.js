const sendEmail = require("../../utils/sendEmail");

class SendGrid {
  static async SendEmail(area) {
    console.log("SendEmail reaction called");
    await sendEmail(area.reaction.args, area.user.email);
  }
}

module.exports = SendGrid;
