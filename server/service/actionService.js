const Clock = require("./action/clock");
const Google = require("./action/google");
const Weather = require("./action/weather");
const Discord = require("./action/discord");
const Facebook = require("./action/facebook");

const ActionDic = {
  TestAction: require("./action/test").console,

  /* Else */
  UniqueTimer: Clock.UniqueTimer,

  /* Gmail */
  TriggerWhenNewMail: Google.TriggerWhenNewMail,
  TriggerWhenDeletedMail: Google.TriggerWhenDeletedMail,
  TriggerWhenNewLabel: Google.TriggerWhenNewLabel,
  TriggerWhenNewStarredMail: Google.TriggerWhenNewStarredMail,
  TriggerWhenNewDraft: Google.TriggerWhenNewDraft,
  TriggerWhenNewAttachment: Google.TriggerWhenNewAttachment,
  TriggerWhenNewEmailMatchingSearch: Google.TriggerWhenNewEmailMatchingSearch,
  TriggerWhenNewThread: Google.TriggerWhenNewThread,

  /* Google Agenda */
  TriggerWhenNewCalendar: Google.TriggerWhenNewCalendar,
  TriggerWhenNewCalendarEvent: Google.TriggerWhenNewCalendarEvent,
  TriggerWhenEventCanceled: Google.TriggerWhenEventCanceled,
  TriggerWhenEventEnded: Google.TriggerWhenEventEnded,
  TriggerWhenEventStarted: Google.TriggerWhenEventStarted,

  /* Google Contacts */
  TriggerWhenNewContact: Google.TriggerWhenNewContact,
  TriggerWhenContactDeleted: Google.TriggerWhenContactDeleted,
  TriggerWhenNewContactLabel: Google.TriggerWhenNewContactLabel,

  /* Google Docs */
  TriggerWhenNewDoc: Google.TriggerWhenNewDoc,
  TriggerWhenDocDeleted: Google.TriggerWhenDocDeleted,

  /* Google Tasks */
  TriggerWhenNewTask: Google.TriggerWhenNewTask,

  /* OpenWeatherMap */
  TriggerWhenTempReached: Weather.TriggerWhenTempReached,
  TriggerWhenTempDropped: Weather.TriggerWhenTempDropped,
  TriggerWhenTempRise: Weather.TriggerWhenTempRise,
  TriggerWhenWeatherReached: Weather.TriggerWhenWeatherReached,

  /* Discord */
  TriggerWhenDiscordNameUpdated: Discord.TriggerWhenNameUpdated,

  /* Facebook */
  TriggerWhenFacebookNameUpdated: Facebook.TriggerWhenNameUpdated,
  TriggerWhenFacebookProfilePictureUpdated:
    Facebook.TriggerWhenProfilePictureUpdated,
};

async function executeAction(area) {
  return await ActionDic[area.action.name](area);
}

module.exports = executeAction;
