const express = require("express");
const router = express.Router();
const AreaController = require("../../controllers/api/AreaController");
const { getActions } = require("../../controllers/api/action");
const { getReactions } = require("../../controllers/api/reaction");
const { protect } = require("../../middleware/auth");

router.get("/area/actions", getActions);
router.get("/area/actions/UniqueTimer", AreaController.getUniqueTimer);
router.get(
  "/area/actions/TriggerWhenNewDraft",
  AreaController.getGoogleTriggerWhenNewDraft
);
router.get(
  "/area/actions/TriggerWhenNewCalendar",
  AreaController.getGoogleTriggerWhenNewCalendar
);
router.get(
  "/area/actions/TriggerWhenNewCalendarEvent",
  AreaController.getGoogleTriggerWhenNewCalendarEvent
);
router.get(
  "/area/actions/TriggerWhenNewMail",
  AreaController.getTriggerWhenNewMail
);
router.get(
  "/area/actions/TriggerWhenNewLabel",
  AreaController.getTriggerWhenNewLabel
);
router.get(
  "/area/actions/TriggerWhenNewStarredMail",
  AreaController.getTriggerWhenNewStarredMail
);
router.get(
  "/area/actions/TriggerWhenNewAttachment",
  AreaController.getTriggerWhenNewAttachment
);
router.get(
  "/area/actions/TriggerWhenNewEmailMatchingSearch",
  AreaController.getTriggerWhenNewEmailMatchingSearch
);
router.get(
  "/area/actions/TriggerWhenNewThread",
  AreaController.getTriggerWhenNewThread
);
router.get(
  "/area/actions/TriggerWhenNewContact",
  AreaController.getTriggerWhenNewContact
);
router.get(
  "/area/actions/TriggerWhenDeletedMail",
  AreaController.getTriggerWhenDeletedMail
);
router.get(
  "/area/actions/TriggerWhenEventCanceled",
  AreaController.getTriggerWhenEventCanceled
);
router.get(
  "/area/actions/TriggerWhenEventEnded",
  AreaController.getTriggerWhenEventEnded
);
router.get(
  "/area/actions/TriggerWhenEventStarted",
  AreaController.getTriggerWhenEventStarted
);
router.get(
  "/area/actions/TriggerWhenTempReached",
  AreaController.getTriggerWhenTempReached
);
router.get(
  "/area/actions/TriggerWhenTempDropped",
  AreaController.getTriggerWhenTempDropped
);
router.get(
  "/area/actions/TriggerWhenTempRise",
  AreaController.getTriggerWhenTempRise
);
router.get(
  "/area/actions/TriggerWhenWeatherReached",
  AreaController.getTriggerWhenWeatherReached
);
router.get(
  "/area/actions/TriggerWhenContactDeleted",
  AreaController.getTriggerWhenContactDeleted
);
router.get(
  "/area/actions/TriggerWhenNewContactLabel",
  AreaController.getTriggerWhenNewContactLabel
);
router.get(
  "/area/actions/TriggerWhenDiscordNameUpdated",
  AreaController.getTriggerWhenDiscordNameUpdated
);
router.get(
  "/area/actions/TriggerWhenFacebookNameUpdated",
  AreaController.getTriggerWhenFacebookNameUpdated
);
router.get(
  "/area/actions/TriggerWhenFacebookProfilePictureUpdated",
  AreaController.getTriggerWhenFacebookProfilePictureUpdated
);
router.get(
  "/area/actions/TriggerWhenNewDoc",
  AreaController.getTriggerWhenNewDoc
);
router.get(
  "/area/actions/TriggerWhenDocDeleted",
  AreaController.getTriggerWhenDocDeleted
);
router.get(
  "/area/actions/TriggerWhenNewTask",
  AreaController.getTriggerWhenNewTask
);

router.get("/area/reactions", getReactions);
router.get("/area/reactions/SendEmail", AreaController.getSendEmail);
router.get("/area/reactions/CreateDraft", AreaController.getGoogleCreateDraft);
router.get("/area/reactions/CreateLabel", AreaController.getGoogleCreateLabel);
router.get("/area/reactions/SendGmail", AreaController.getGoogleSendGmail);
router.get(
  "/area/reactions/DeleteJunkMail",
  AreaController.getGoogleDeleteJunkMail
);
router.get(
  "/area/reactions/DeleteDrafts",
  AreaController.getGoogleDeleteDrafts
);
router.get(
  "/area/reactions/StarredNewMail",
  AreaController.getGoogleStarredNewMail
);
router.get(
  "/area/reactions/CreateCalendar",
  AreaController.getGoogleCreateCalendar
);
router.get("/area/reactions/CreateEvent", AreaController.getGoogleCreateEvent);
router.get(
  "/area/reactions/DeleteDetailedEvent",
  AreaController.getGoogleDeleteDetailedEvent
);
router.get(
  "/area/reactions/InviteToCalendar",
  AreaController.getGoogleInviteToCalendar
);
router.get("/area/reactions/UpdateEvent", AreaController.getGoogleUpdateEvent);
router.get("/area/reactions/CreateContact", AreaController.getCreateContact);
router.get("/area/reactions/DeleteContact", AreaController.getDeleteContact);
router.get("/area/reactions/SendSMS", AreaController.getSendSMS);
router.get("/area/reactions/SendMMS", AreaController.getSendMMS);
router.get("/area/reactions/Call", AreaController.getCall);
router.get(
  "/area/reactions/WhatsAppSendMessage",
  AreaController.getWhatsAppSendMessage
);
router.get(
  "/area/reactions/WhatsAppSendMedia",
  AreaController.getWhatsAppSendMedia
);
router.get(
  "/area/reactions/CreateContactLabel",
  AreaController.getCreateContactLabel
);
router.get(
  "/area/reactions/DeleteContactLabel",
  AreaController.getDeleteContactLabel
);
router.get(
  "/area/reactions/AddContactToLabel",
  AreaController.getAddContactToLabel
);
router.get("/area/reactions/UpdateContact", AreaController.getUpdateContact);
router.get(
  "/area/reactions/UpdateContactPhoto",
  AreaController.getUpdateContactPhoto
);
router.get(
  "/area/reactions/UpdateTextToFile",
  AreaController.getUpdateTextToFile
);
router.get("/area/reactions/CreateDocument", AreaController.getCreateDocument);
router.get(
  "/area/reactions/MoveFileToFolder",
  AreaController.getMoveFileToFolder
);
router.get("/area/reactions/SendTweet", AreaController.getSendTweet);
router.get(
  "/area/reactions/OutlookSendEmail",
  AreaController.getOutlookSendEmail
);

router.post("/area", protect, AreaController.createArea);
router.delete("/area/:id", protect, AreaController.deleteArea);

module.exports = router;
