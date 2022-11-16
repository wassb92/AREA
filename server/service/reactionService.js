const SendGrid = require("./reaction/mailBox");
const TestReaction = require("./reaction/test");
const Google = require("./reaction/google");
const { Twilio } = require("./reaction/twilio");
const { WhatsApp } = require("./reaction/twilio");
const Twitter = require("./reaction/twitter");
const Microsoft = require("./reaction/microsoft");

const ReActionDic = {
  TestReaction: TestReaction.console,

  /* SendGrid */
  SendEmail: SendGrid.SendEmail,

  /* Gmail */
  CreateDraft: Google.CreateDraft,
  CreateLabel: Google.CreateLabel,
  SendGmail: Google.SendGmail,
  DeleteJunkMail: Google.DeleteJunkMail,
  DeleteDrafts: Google.DeleteDrafts,
  StarredNewMail: Google.StarredNewMail,

  /* Google Agenda */
  CreateCalendar: Google.CreateCalendar,
  CreateEvent: Google.CreateEvent,
  DeleteDetailedEvent: Google.DeleteDetailedEvent,
  InviteToCalendar: Google.InviteToCalendar,
  UpdateEvent: Google.UpdateEvent,

  /* Google Contacts */
  CreateContact: Google.CreateContact,
  DeleteContact: Google.DeleteContact,
  CreateContactLabel: Google.CreateContactLabel,
  DeleteContactLabel: Google.DeleteContactLabel,
  AddContactToLabel: Google.AddContactToLabel,
  UpdateContact: Google.UpdateContact,
  UpdateContactPhoto: Google.UpdateContactPhoto,

  /* Google Drive */
  UpdateTextToFile: Google.UpdateTextToFile,
  CreateDocument: Google.CreateDocument,
  MoveFileToFolder: Google.MoveFileToFolder,

  /* Twilio */
  SendSMS: Twilio.sendSMS,
  SendMMS: Twilio.sendMMS,
  Call: Twilio.call,

  /* WhatsApp */
  WhatsAppSendMessage: WhatsApp.SendMessage,
  WhatsAppSendMedia: WhatsApp.SendMedia,

  /* Twitter */
  SendTweet: Twitter.SendTweet,

  /* Microsoft */
  OutlookSendEmail: Microsoft.sendMail,
};

async function processReaction(area) {
  return await ReActionDic[area.reaction.name](area);
}

module.exports = processReaction;
