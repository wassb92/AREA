const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function formatNumberPhone(number) {
  if (number.startsWith("0")) number = number.replace("0", "+33");
  number = number.replace(/ /g, "");
  number = number.replace(/\./g, "");
  number = number.replace(/-/g, "");
  return number;
}

function voiceXML(message) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Say voice="alice" language="fr-FR">${message}</Say>
  </Response>`;
}

class Twilio {
  static async sendSMS(area) {
    const body = area.reaction.args.body;
    const to = area.reaction.args.phone;

    client.messages
      .create({
        body: body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formatNumberPhone(to),
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.log(err));
  }

  static async sendMMS(area) {
    const image = area.reaction.args.mediaUrl;
    const body = area.reaction.args.body;
    const to = area.reaction.args.phone;

    client.messages
      .create({
        body: body,
        from: process.env.TWILIO_PHONE_NUMBER,
        mediaUrl: image,
        to: formatNumberPhone(to),
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.log(err));
  }

  static async call(area) {
    const to = area.reaction.args.phone;
    const message = area.reaction.args.message;
    console.log("area.reaction.args", area.reaction.args);

    client.calls
      .create({
        twiml: voiceXML(message),
        to: formatNumberPhone(to),
        from: process.env.TWILIO_PHONE_NUMBER,
      })
      .then((call) => console.log(call.sid))
      .catch((err) => console.log(err));
  }
}

class WhatsApp {
  static async SendMessage(area) {
    const body = area.reaction.args.body;
    const to = area.reaction.args.phone;

    client.messages
      .create({
        body: body,
        from: "whatsapp:" + process.env.WHATSAPP_PHONE_NUMBER,
        to: "whatsapp:" + formatNumberPhone(to),
      })
      .then((message) => console.log(message.sid))
      .done();
  }

  static async SendMedia(area) {
    const body = area.reaction.args.body;
    const image = area.reaction.args.mediaUrl;
    const to = area.reaction.args.phone;

    client.messages
      .create({
        body: body,
        from: "whatsapp:" + process.env.WHATSAPP_PHONE_NUMBER,
        mediaUrl: image,
        to: "whatsapp:" + formatNumberPhone(to),
      })
      .then((message) => console.log(message.sid))
      .done();
  }
}

module.exports = {
  Twilio,
  WhatsApp,
};
