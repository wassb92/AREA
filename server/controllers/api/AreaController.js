require("dotenv").config({ path: "./config.env" });
const AreaCenter = require("../../service/areaControlCenter");
const { default: mongoose } = require("mongoose");
const ErrorResponse = require("../../utils/errorResponse");
const User = require("../../models/user");

exports.createArea = async function (req, res, next) {
  try {
    let area = req.body;
    area._id = new mongoose.Types.ObjectId().toString();
    const userAREA = {
      _id: area._id,
      action: area.action.name,
      reaction: area.reaction.name,
    };
    req.user.areas.push(userAREA);
    area.user = req.user;
    await AreaCenter.createArea(area);
    await req.user.save();
    res.status(200).json({ success: true, data: "Area created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteArea = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const area = user.areas.id(req.params.id);
    if (!area) {
      return next(
        new ErrorResponse(`Area not found with id of ${req.params.id}`, 404)
      );
    }
    area.remove();
    await AreaCenter.deleteArea(req.params.id);
    await user.save();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

/**********************************  action  ****************************************/

exports.getUniqueTimer = async function (req, res, next) {
  res.status(200).json({
    page_label: "Chronomètre",
    page_description: "Choisir un créneau pour éxécuter une réaction",
    action_name: "UniqueTimer",
    fields: [
      {
        field_id: "time",
        field_label: "Timer",
        field_mandatory: "yes",
        field_placeholder: "Choisir un créneau",
        field_type: "time",
        field_value: "",
        field_error: "Veuillez choisir un créneau valide",
        field_inputNum: 0,
      },
    ],
  });
};

exports.getGoogleTriggerWhenNewDraft = async function (req, res, next) {
  res.status(200).json({
    page_label: "Gmail Brouillon",
    page_description: "Déclencher une réaction si un brouillon est créé",
    action_name: "TriggerWhenNewDraft",
    fields: [],
  });
};

// TriggerWhenNewCalendar
exports.getGoogleTriggerWhenNewCalendar = async function (req, res, next) {
  res.status(200).json({
    page_label: "Nouveau Calendrier",
    page_description:
      "Déclencher une réaction si un nouveau calendrier est créé",
    action_name: "TriggerWhenNewCalendar",
    fields: [],
  });
};

exports.getGoogleTriggerWhenNewCalendarEvent = async function (req, res, next) {
  res.status(200).json({
    page_label: "Google Agenda",
    page_description: "Déclencher une réaction si un nouvel évènement est créé",
    action_name: "TriggerWhenNewCalendarEvent",
    fields: [],
  });
};

exports.getTriggerWhenNewMail = async function (req, res, next) {
  res.status(200).json({
    page_label: "Gmail Nouveau Mail",
    page_description: "Déclencher une réaction si un nouveau mail est reçu",
    action_name: "TriggerWhenNewMail",
    fields: [],
  });
};

exports.getTriggerWhenNewLabel = async function (req, res, next) {
  res.status(200).json({
    page_label: "Gmail Nouveau Label",
    page_description: "Déclencher une réaction si un nouveau label est créé",
    action_name: "TriggerWhenNewLabel",
    fields: [],
  });
};

exports.getTriggerWhenNewStarredMail = async function (req, res, next) {
  res.status(200).json({
    page_label: "Gmail Nouveau Mail Star",
    page_description: "Déclencher une réaction si un nouveau mail est star",
    action_name: "TriggerWhenNewStarredMail",
    fields: [],
  });
};

exports.getTriggerWhenNewAttachment = async function (req, res, next) {
  res.status(200).json({
    page_label: "Gmail Nouveau Mail avec pièce jointe",
    page_description:
      "Déclencher une réaction si un nouveau mail avec pièce jointe est reçu",
    action_name: "TriggerWhenNewAttachment",
    fields: [],
  });
};

exports.getTriggerWhenNewEmailMatchingSearch = async function (req, res, next) {
  res.status(200).json({
    page_label: "Gmail Nouveau Mail avec recherche",
    page_description:
      "Déclencher une réaction si un nouveau mail avec recherche est reçu",
    action_name: "TriggerWhenNewEmailMatchingSearch",
    fields: [
      {
        field_id: "search",
        field_label: "Recherche",
        field_mandatory: "yes",
        field_placeholder: "Recherche",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir une recherche valide",
        field_inputNum: 0,
      },
    ],
  });
};

exports.getTriggerWhenNewThread = async function (req, res, next) {
  res.status(200).json({
    page_label: "Gmail Nouveau Thread",
    page_description: "Déclencher une réaction si un nouveau thread est reçu",
    action_name: "TriggerWhenNewThread",
    fields: [],
  });
};

exports.getTriggerWhenNewContact = async function (req, res, next) {
  res.status(200).json({
    page_label: "Evernote Nouveau Contact",
    page_description: "Déclencher une réaction si un nouveau contact est créé",
    action_name: "TriggerWhenNewContact",
    fields: [],
  });
};

exports.getTriggerWhenDeletedMail = async function (req, res, next) {
  res.status(200).json({
    page_label: "Gmail Mail supprimé",
    page_description: "Déclencher une réaction si un mail est supprimé",
    action_name: "TriggerWhenDeletedMail",
    fields: [],
  });
};

exports.getTriggerWhenEventCanceled = async function (req, res, next) {
  res.status(200).json({
    page_label: "Google Agenda Évènement annulé",
    page_description: "Déclencher une réaction si un évènement est annulé",
    action_name: "TriggerWhenEventCanceled",
    fields: [],
  });
};

exports.getTriggerWhenEventEnded = async function (req, res, next) {
  res.status(200).json({
    page_label: "Google Agenda Évènement terminé",
    page_description: "Déclencher une réaction si un évènement est terminé",
    action_name: "TriggerWhenEventEnded",
    fields: [],
  });
};

exports.getTriggerWhenEventStarted = async function (req, res, next) {
  res.status(200).json({
    page_label: "Google Agenda Évènement démarré",
    page_description: "Déclencher une réaction si un évènement est démarré",
    action_name: "TriggerWhenEventStarted",
    fields: [
      {
        field_id: "timeBeforeEvent",
        field_label: "Minutes avant",
        field_mandatory: "yes",
        field_placeholder: "Minutes avant",
        field_type: "number",
        field_value: "",
        field_error: "Veuillez saisir un nombre de minutes valide",
        field_inputNum: 0,
      },
    ],
  });
};

exports.getTriggerWhenTempReached = async function (req, res, next) {
  res.status(200).json({
    page_label: "Température",
    page_description: "Déclencher une réaction si la température est atteinte",
    action_name: "TriggerWhenTempReached",
    fields: [
      {
        field_id: "temp",
        field_label: "Température",
        field_mandatory: "yes",
        field_placeholder: "Température",
        field_type: "number",
        field_value: "",
        field_error: "Veuillez saisir une température valide",
        field_inputNum: 0,
      },
      {
        field_id: "city",
        field_label: "Ville",
        field_mandatory: "yes",
        field_placeholder: "Ville",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir une ville valide",
        field_inputNum: 1,
      },
      {
        field_id: "choice",
        field_label: "Choix",
        field_mandatory: "yes",
        field_placeholder: "Choix",
        field_type: "select",
        field_value: "",
        field_error: "Veuillez saisir un choix valide",
        field_inputNum: 2,
        field_options: [
          { option_id: "above", option_label: "Au dessus" },
          { option_id: "below", option_label: "En dessous" },
        ],
      },
    ],
  });
};

exports.getTriggerWhenTempDropped = async function (req, res, next) {
  res.status(200).json({
    page_label: "Température",
    page_description: "Déclencher une réaction si la température chute",
    action_name: "TriggerWhenTempDropped",
    fields: [
      {
        field_id: "city",
        field_label: "Ville",
        field_mandatory: "yes",
        field_placeholder: "Ville",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir une ville valide",
        field_inputNum: 1,
      },
    ],
  });
};

exports.getTriggerWhenTempRise = async function (req, res, next) {
  res.status(200).json({
    page_label: "Température",
    page_description: "Déclencher une réaction si la température augmente",
    action_name: "TriggerWhenTempRise",
    fields: [
      {
        field_id: "city",
        field_label: "Ville",
        field_mandatory: "yes",
        field_placeholder: "Ville",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir une ville valide",
        field_inputNum: 1,
      },
    ],
  });
};

exports.getTriggerWhenWeatherReached = async function (req, res, next) {
  res.status(200).json({
    page_label: "Météo",
    page_description: "Déclencher une réaction si le temps est atteinte",
    action_name: "TriggerWhenWeatherReached",
    fields: [
      {
        field_id: "city",
        field_label: "Ville",
        field_mandatory: "yes",
        field_placeholder: "Ville",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir une ville valide",
        field_inputNum: 0,
      },
      {
        field_id: "weatherSearched",
        field_label: "Temps recherchée",
        field_mandatory: "yes",
        field_placeholder: "Temps recherchée",
        field_type: "select",
        field_value: "",
        field_error: "Veuillez saisir un temps recherchée valide",
        field_inputNum: 1,
        field_options: [
          { option_value: "Thunderstorm", option_label: "Orage" },
          { option_value: "Drizzle", option_label: "Bruine" },
          { option_value: "Rain", option_label: "Pluie" },
          { option_value: "Snow", option_label: "Neige" },
          { option_value: "Atmosphere", option_label: "Atmosphère" },
          { option_value: "Clear", option_label: "Clair" },
          { option_value: "Clouds", option_label: "Nuageux" },
        ],
      },
    ],
  });
};

exports.getTriggerWhenDiscordNameUpdated = async function (req, res, next) {
  res.status(200).json({
    page_label: "Nom mis à jour Discord",
    page_description:
      "Déclencher une réaction si le nom Discord est mis à jour",
    action_name: "TriggerWhenDiscordNameUpdated",
    fields: [],
  });
};

exports.getTriggerWhenFacebookNameUpdated = async function (req, res, next) {
  res.status(200).json({
    page_label: "Nom mis à jour Facebook",
    page_description:
      "Déclencher une réaction si le nom Facebook est mis à jour",
    action_name: "TriggerWhenFacebookNameUpdated",
    fields: [],
  });
};

exports.getTriggerWhenFacebookProfilePictureUpdated = async function (
  req,
  res,
  next
) {
  res.status(200).json({
    page_label: "Photo de profil Facebook mise à jour",
    page_description:
      "Déclencher une réaction si la photo de profil Facebook est mise à jour",
    action_name: "TriggerWhenFacebookProfilePictureUpdated",
    fields: [],
  });
};

exports.getTriggerWhenContactDeleted = async function (req, res, next) {
  res.status(200).json({
    page_label: "Google Contacts Supprimé",
    page_description: "Déclencher une réaction si un contact est supprimé",
    action_name: "TriggerWhenContactDeleted",
    fields: [],
  });
};

exports.getTriggerWhenNewContactLabel = async function (req, res, next) {
  res.status(200).json({
    page_label: "Nouveau label Google Contacts",
    page_description: "Déclencher une réaction si un nouveau label est crée",
    action_name: "TriggerWhenNewContactLabel",
    fields: [],
  });
};

exports.getTriggerWhenNewDoc = async function (req, res, next) {
  res.status(200).json({
    page_label: "Nouveau Document",
    page_description: "Déclencher une réaction si un nouveau document est créé",
    action_name: "TriggerWhenNewDoc",
    fields: [],
  });
};

exports.getTriggerWhenDocDeleted = async function (req, res, next) {
  res.status(200).json({
    page_label: "Document Supprimé",
    page_description: "Déclencher une réaction si un document est supprimé",
    action_name: "TriggerWhenDocDeleted",
    fields: [],
  });
};

exports.getTriggerWhenNewTask = async function (req, res, next) {
  res.status(200).json({
    page_label: "Nouvelle Tâche",
    page_description: "Déclencher une réaction si une nouvelle tâche est créée",
    action_name: "TriggerWhenNewTask",
    fields: [],
  });
};

/**********************************  reaction  ****************************************/

exports.getSendEmail = async function (req, res, next) {
  res.status(200).json({
    page_label: "Envoyer un Email",
    page_description:
      "Envoyer un mail avec un destinataire et un message venant de votre mail",
    reaction_name: "SendEmail",
    fields: [
      {
        field_id: "to",
        field_label: "Destinataire",
        field_mandatory: "yes",
        field_placeholder: "Destinataire",
        field_type: "email",
        field_value: "",
        field_error: "Veuillez saisir un destinataire valide",
        field_inputNum: 0,
      },
      {
        field_id: "subject",
        field_label: "Sujet",
        field_mandatory: "yes",
        field_placeholder: "Sujet",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un sujet valide",
        field_inputNum: 1,
      },
      {
        field_id: "body",
        field_label: "Message",
        field_mandatory: "yes",
        field_placeholder: "Message",
        field_type: "textarea",
        field_value: "",
        field_error: "Veuillez saisir un message valide",
        field_inputNum: 2,
      },
    ],
  });
};

exports.getGoogleCreateDraft = async function (req, res, next) {
  res.status(200).json({
    page_label: "Créer un Brouillon",
    page_description: "Créer un brouillon avec un destinataire et un message",
    reaction_name: "CreateDraft",
    fields: [
      {
        field_id: "to",
        field_label: "Destinataire",
        field_mandatory: "yes",
        field_placeholder: "Destinataire",
        field_type: "email",
        field_value: "",
        field_error: "Veuillez saisir un destinataire valide",
        field_inputNum: 0,
      },
      {
        field_id: "subject",
        field_label: "Sujet",
        field_mandatory: "yes",
        field_placeholder: "Sujet",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un sujet valide",
        field_inputNum: 1,
      },
      {
        field_id: "body",
        field_label: "Message",
        field_mandatory: "yes",
        field_placeholder: "Message",
        field_type: "textarea",
        field_value: "",
        field_error: "Veuillez saisir un message valide",
        field_inputNum: 2,
      },
    ],
  });
};

exports.getGoogleCreateLabel = async function (req, res, next) {
  res.status(200).json({
    page_label: "Créer un Label",
    page_description: "Créer un label avec un nom",
    reaction_name: "CreateLabel",
    fields: [
      {
        field_id: "name",
        field_label: "Nom",
        field_mandatory: "yes",
        field_placeholder: "Nom",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un nom valide",
        field_inputNum: 0,
      },
    ],
  });
};

exports.getGoogleSendGmail = async function (req, res, next) {
  res.status(200).json({
    page_label: "Envoyer un mail Gmail",
    page_description:
      "Envoyer un mail avec un destinataire et un message venant de votre mail",
    reaction_name: "SendGmail",
    fields: [
      {
        field_id: "to",
        field_label: "Destinataire",
        field_mandatory: "yes",
        field_placeholder: "Destinataire",
        field_type: "email",
        field_value: "",
        field_error: "Veuillez saisir un destinataire valide",
        field_inputNum: 0,
      },
      {
        field_id: "subject",
        field_label: "Sujet",
        field_mandatory: "yes",
        field_placeholder: "Sujet",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un sujet valide",
        field_inputNum: 1,
      },
      {
        field_id: "body",
        field_label: "Message",
        field_mandatory: "yes",
        field_placeholder: "Message",
        field_type: "textarea",
        field_value: "",
        field_error: "Veuillez saisir un message valide",
        field_inputNum: 2,
      },
    ],
  });
};

exports.getGoogleDeleteJunkMail = async function (req, res, next) {
  res.status(200).json({
    page_label: "Supprime mails indésirables Gmail",
    page_description:
      "Supprimer tous les mails indésirables de votre boite mail",
    reaction_name: "DeleteJunkMail",
    fields: [],
  });
};

exports.getGoogleDeleteDrafts = async function (req, res, next) {
  res.status(200).json({
    page_label: "Supprimer les Brouillons",
    page_description: "Supprimer les brouillons Gmail",
    reaction_name: "DeleteDrafts",
    fields: [],
  });
};

exports.getGoogleStarredNewMail = async function (req, res, next) {
  res.status(200).json({
    page_label: "Nouvelle mail en favoris",
    page_description: "Étoiler tous les mails non lus de votre boite mail",
    reaction_name: "StarredNewMail",
    fields: [],
  });
};

exports.getGoogleCreateCalendar = async function (req, res, next) {
  res.status(200).json({
    page_label: "Créer un Calendrier",
    page_description: "Créer un calendrier avec un nom",
    reaction_name: "CreateCalendar",
    fields: [
      {
        field_id: "summary",
        field_label: "Sommaire",
        field_mandatory: "yes",
        field_placeholder: "Sommaire",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un sommaire valide",
        field_inputNum: 0,
      },
      {
        field_id: "description",
        field_label: "Description",
        field_mandatory: "yes",
        field_placeholder: "Description",
        field_type: "textarea",
        field_value: "",
        field_error: "Veuillez saisir une description valide",
        field_inputNum: 1,
      },
    ],
  });
};

exports.getGoogleCreateEvent = async function (req, res, next) {
  res.status(200).json({
    page_label: "Créer un Google Agenda Évènement",
    page_description: "Créer un évènement avec un nom et une date",
    reaction_name: "CreateEvent",
    fields: [
      {
        field_id: "summary",
        field_label: "Sommaire",
        field_mandatory: "yes",
        field_placeholder: "Sommaire",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un sommaire valide",
        field_inputNum: 0,
      },
      {
        field_id: "description",
        field_label: "Description",
        field_mandatory: "yes",
        field_placeholder: "Description",
        field_type: "textarea",
        field_value: "",
        field_error: "Veuillez saisir une description valide",
        field_inputNum: 1,
      },
      {
        field_id: "start",
        field_label: "Date de début",
        field_mandatory: "yes",
        field_placeholder: "Date de début",
        field_type: "date",
        field_value: "",
        field_error: "Veuillez saisir une date de début valide",
        field_inputNum: 2,
      },
      {
        field_id: "end",
        field_label: "Date de fin",
        field_mandatory: "yes",
        field_placeholder: "Date de fin",
        field_type: "date",
        field_value: "",
        field_error: "Veuillez saisir une date de fin valide",
        field_inputNum: 3,
      },
    ],
  });
};

exports.getGoogleDeleteDetailedEvent = async function (req, res, next) {
  res.status(200).json({
    page_label: "Supprimer un Google Agenda Évènement",
    page_description: "Supprimer un évènement avec un nom",
    reaction_name: "DeleteDetailedEvent",
    fields: [
      {
        field_id: "summary",
        field_label: "Sommaire",
        field_mandatory: "yes",
        field_placeholder: "Sommaire",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un sommaire valide",
        field_inputNum: 0,
      },
    ],
  });
};

exports.getGoogleInviteToCalendar = async function (req, res, next) {
  res.status(200).json({
    page_label: "Inviter à un Google Agenda",
    page_description: "Inviter à un Google Agenda",
    reaction_name: "InviteToCalendar",
    fields: [
      {
        field_id: "email",
        field_label: "Email",
        field_mandatory: "yes",
        field_placeholder: "Email",
        field_type: "email",
        field_value: "",
        field_error: "Veuillez saisir un email valide",
        field_inputNum: 0,
      }
    ],
  });
};

exports.getGoogleUpdateEvent = async function (req, res, next) {
  res.status(200).json({
    page_label: "Mettre à jour un Google Agenda Évènement",
    page_description: "Mettre à jour un évènement avec un nom",
    reaction_name: "UpdateEvent",
    fields: [
      {
        field_id: "summary",
        field_label: "Sommaire",
        field_mandatory: "yes",
        field_placeholder: "Sommaire",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un sommaire valide",
        field_inputNum: 0,
      },
      {
        field_id: "newSummary",
        field_label: "Nouveau Sommaire",
        field_mandatory: "yes",
        field_placeholder: "Nouveau Sommaire",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un nouveau sommaire valide",
        field_inputNum: 1,
      },
      {
        field_id: "newDescription",
        field_label: "Nouvelle Description",
        field_mandatory: "yes",
        field_placeholder: "Nouvelle Description",
        field_type: "textarea",
        field_value: "",
        field_error: "Veuillez saisir une nouvelle description valide",
        field_inputNum: 2,
      },
      {
        field_id: "newStart",
        field_label: "Nouvelle Date de début",
        field_mandatory: "yes",
        field_placeholder: "Nouvelle Date de début",
        field_type: "date",
        field_value: "",
        field_error: "Veuillez saisir une nouvelle date de début valide",
        field_inputNum: 3,
      },
      {
        field_id: "newEnd",
        field_label: "Nouvelle Date de fin",
        field_mandatory: "yes",
        field_placeholder: "Nouvelle Date de fin",
        field_type: "date",
        field_value: "",
        field_error: "Veuillez saisir une nouvelle date de fin valide",
        field_inputNum: 4,
      },
    ],
  });
};

exports.getCreateContact = async function (req, res, next) {
  res.status(200).json({
    page_label: "Créer un contact",
    page_description: "Créer un contact sur Google Contacts",
    reaction_name: "CreateContact",
    fields: [
      {
        field_id: "givenName",
        field_label: "Prénom",
        field_mandatory: "yes",
        field_placeholder: "Prénom",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un prénom valide",
        field_inputNum: 0,
      },
      {
        field_id: "familyName",
        field_label: "Nom",
        field_mandatory: "yes",
        field_placeholder: "Nom",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un nom valide",
        field_inputNum: 1,
      },
      {
        field_id: "email",
        field_label: "Email",
        field_mandatory: "yes",
        field_placeholder: "Email",
        field_type: "email",
        field_value: "",
        field_error: "Veuillez saisir un email valide",
        field_inputNum: 2,
      },
    ],
  });
};

exports.getDeleteContact = async function (req, res, next) {
  res.status(200).json({
    page_label: "Supprimer un contact",
    page_description: "Supprimer un contact avec un nom et un prénom",
    reaction_name: "DeleteContact",
    fields: [
      {
        field_id: "givenName",
        field_label: "Prénom",
        field_mandatory: "yes",
        field_placeholder: "Prénom",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un prénom valide",
        field_inputNum: 0,
      },
      {
        field_id: "familyName",
        field_label: "Nom",
        field_mandatory: "yes",
        field_placeholder: "Nom",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un nom valide",
        field_inputNum: 1,
      },
    ],
  });
};

exports.getSendSMS = async function (req, res, next) {
  res.status(200).json({
    page_label: "Envoyer un SMS",
    page_description:
      "Envoyer un SMS avec un numéro de téléphone et un message",
    reaction_name: "SendSMS",
    fields: [
      {
        field_id: "phone",
        field_label: "Téléphone",
        field_mandatory: "yes",
        field_placeholder: "Téléphone",
        field_type: "tel",
        field_value: "",
        field_error: "Veuillez saisir un numéro de téléphone valide",
        field_inputNum: 0,
      },
      {
        field_id: "body",
        field_label: "Message",
        field_mandatory: "yes",
        field_placeholder: "Message",
        field_type: "textarea",
        field_value: "",
        field_error: "Veuillez saisir un message valide",
        field_inputNum: 1,
      },
    ],
  });
};

exports.getSendMMS = async function (req, res, next) {
  res.status(200).json({
    page_label: "Envoyer un MMS",
    page_description:
      "Envoyer un MMS avec un numéro de téléphone, message et une image",
    reaction_name: "SendMMS",
    fields: [
      {
        field_id: "phone",
        field_label: "Téléphone",
        field_mandatory: "yes",
        field_placeholder: "Téléphone",
        field_type: "tel",
        field_value: "",
        field_error: "Veuillez saisir un numéro de téléphone valide",
        field_inputNum: 0,
      },
      {
        field_id: "body",
        field_label: "Message",
        field_mandatory: "yes",
        field_placeholder: "Message",
        field_type: "textarea",
        field_value: "",
        field_error: "Veuillez saisir un message valide",
        field_inputNum: 1,
      },
      {
        field_id: "mediaUrl",
        field_label: "URL de l'image",
        field_mandatory: "yes",
        field_placeholder: "URL de l'image",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir une URL valide",
        field_inputNum: 2,
      },
    ],
  });
};

exports.getCall = async function (req, res, next) {
  res.status(200).json({
    page_label: "Appeler un numéro",
    page_description: "Appeler un numéro de téléphone avec un message",
    reaction_name: "Call",
    fields: [
      {
        field_id: "phone",
        field_label: "Téléphone",
        field_mandatory: "yes",
        field_placeholder: "Téléphone",
        field_type: "tel",
        field_value: "",
        field_error: "Veuillez saisir un numéro de téléphone valide",
        field_inputNum: 0,
      },
      {
        field_id: "message",
        field_label: "Message",
        field_mandatory: "yes",
        field_placeholder: "Message",
        field_type: "textarea",
        field_value: "",
        field_error: "Veuillez saisir un message valide",
        field_inputNum: 1,
      },
    ],
  });
};

exports.getWhatsAppSendMessage = async function (req, res, next) {
  res.status(200).json({
    page_label: "Envoyer un message WhatsApp",
    page_description:
      "Envoyer un message WhatsApp avec à un numéro de téléphone avec un message",
    reaction_name: "WhatsAppSendMessage",
    fields: [
      {
        field_id: "phone",
        field_label: "Téléphone",
        field_mandatory: "yes",
        field_placeholder: "Téléphone",
        field_type: "tel",
        field_value: "",
        field_error: "Veuillez saisir un numéro de téléphone valide",
        field_inputNum: 0,
      },
      {
        field_id: "body",
        field_label: "Message",
        field_mandatory: "yes",
        field_placeholder: "Message",
        field_type: "textarea",
        field_value: "",
        field_error: "Veuillez saisir un message valide",
        field_inputNum: 1,
      },
    ],
  });
};

exports.getWhatsAppSendMedia = async function (req, res, next) {
  res.status(200).json({
    page_label: "Envoyer une image WhatsApp",
    page_description:
      "Envoyer un message et une image WhatsApp à un numéro de téléphone",
    reaction_name: "WhatsAppSendMedia",
    fields: [
      {
        field_id: "phone",
        field_label: "Téléphone",
        field_mandatory: "yes",
        field_placeholder: "Téléphone",
        field_type: "tel",
        field_value: "",
        field_error: "Veuillez saisir un numéro de téléphone valide",
        field_inputNum: 0,
      },
      {
        field_id: "body",
        field_label: "Message",
        field_mandatory: "yes",
        field_placeholder: "Message",
        field_type: "textarea",
        field_value: "",
        field_error: "Veuillez saisir un message valide",
        field_inputNum: 1,
      },
      {
        field_id: "mediaUrl",
        field_label: "URL de l'image",
        field_mandatory: "yes",
        field_placeholder: "URL de l'image",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir une URL valide",
        field_inputNum: 2,
      },
    ],
  });
};

exports.getCreateContactLabel = async function (req, res, next) {
  res.status(200).json({
    page_label: "Crée un label Google Contacts",
    page_description: "Créer un label",
    reaction_name: "CreateContactLabel",
    fields: [
      {
        field_id: "labelName",
        field_label: "Label",
        field_mandatory: "yes",
        field_placeholder: "Label",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un label valide",
        field_inputNum: 0,
      },
    ],
  });
};

exports.getDeleteContactLabel = async function (req, res, next) {
  res.status(200).json({
    page_label: "Supprime un label Google Contacts",
    page_description: "Supprimer un label",
    reaction_name: "DeleteContactLabel",
    fields: [
      {
        field_id: "labelName",
        field_label: "Label",
        field_mandatory: "yes",
        field_placeholder: "Label",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un label valide",
        field_inputNum: 0,
      },
    ],
  });
};

exports.getAddContactToLabel = async function (req, res, next) {
  res.status(200).json({
    page_label: "Ajoute un contact à un label Google Contacts",
    page_description: "Ajouter un contact à un label",
    reaction_name: "AddContactToLabel",
    fields: [
      {
        field_id: "givenName",
        field_label: "Prénom",
        field_mandatory: "yes",
        field_placeholder: "Prénom",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un prénom valide",
        field_inputNum: 0,
      },
      {
        field_id: "familyName",
        field_label: "Nom",
        field_mandatory: "yes",
        field_placeholder: "Nom",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un nom valide",
        field_inputNum: 1,
      },
      {
        field_id: "label",
        field_label: "Label",
        field_mandatory: "yes",
        field_placeholder: "Label",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un label valide",
        field_inputNum: 2,
      },
    ],
  });
};

exports.getUpdateContact = async function (req, res, next) {
  res.status(200).json({
    page_label: "Mettre à jour un contact Google Contacts",
    page_description: "Modifier un contact",
    reaction_name: "UpdateContact",
    fields: [
      {
        field_id: "givenName",
        field_label: "Prénom",
        field_mandatory: "yes",
        field_placeholder: "Prénom",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un prénom valide",
        field_inputNum: 0,
      },
      {
        field_id: "familyName",
        field_label: "Nom",
        field_mandatory: "yes",
        field_placeholder: "Nom",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un nom valide",
        field_inputNum: 1,
      },
      {
        field_id: "newGivenName",
        field_label: "Nouveau prénom",
        field_mandatory: "yes",
        field_placeholder: "Nouveau prénom",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un nouveau prénom valide",
        field_inputNum: 2,
      },
      {
        field_id: "newFamilyName",
        field_label: "Nouveau nom",
        field_mandatory: "yes",
        field_placeholder: "Nouveau nom",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un nouveau nom valide",
        field_inputNum: 3,
      },
      {
        field_id: "newEmail",
        field_label: "Nouvel email",
        field_mandatory: "yes",
        field_placeholder: "Nouvel email",
        field_type: "email",
        field_value: "",
        field_error: "Veuillez saisir un nouvel email valide",
        field_inputNum: 4,
      },
    ],
  });
};

exports.getUpdateContactPhoto = async function (req, res, next) {
  res.status(200).json({
    page_label: "Mettre à jour la photo d'un contact Google Contacts",
    page_description:
      "Mettre à jour la photo d'un contact Google Contacts avec un nom de contact et une image",
    reaction_name: "UpdateContactPhoto",
    fields: [
      {
        field_id: "photoUrl",
        field_label: "URL de la photo",
        field_mandatory: "yes",
        field_placeholder: "URL de la photo",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir une URL valide",
        field_inputNum: 0,
      },
      {
        field_id: "givenName",
        field_label: "Prénom",
        field_mandatory: "yes",
        field_placeholder: "Prénom",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un prénom valide",
        field_inputNum: 1,
      },
      {
        field_id: "familyName",
        field_label: "Nom",
        field_mandatory: "yes",
        field_placeholder: "Nom",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un nom valide",
        field_inputNum: 2,
      },
    ],
  });
};

exports.getUpdateTextToFile = async function (req, res, next) {
  res.status(200).json({
    page_label: "Mettre à jour un fichier texte",
    page_description: "Mettre à jour un fichier texte Google Drive",
    reaction_name: "UpdateTextToFile",
    fields: [
      {
        field_id: "fileName",
        field_label: "Nom du fichier",
        field_mandatory: "yes",
        field_placeholder: "Nom du fichier",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un nom de fichier valide",
        field_inputNum: 0,
      },
      {
        field_id: "text",
        field_label: "Texte",
        field_mandatory: "yes",
        field_placeholder: "Texte",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un texte valide",
        field_inputNum: 1,
      },
    ],
  });
};

exports.getCreateDocument = async function (req, res, next) {
  res.status(200).json({
    page_label: "Créer un document",
    page_description: "Créer un document Google Drive",
    reaction_name: "CreateDocument",
    fields: [
      {
        field_id: "fileName",
        field_label: "Nom du document",
        field_mandatory: "yes",
        field_placeholder: "Nom du document",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un nom de document valide",
        field_inputNum: 0,
      },
      {
        field_id: "text",
        field_label: "Texte",
        field_mandatory: "yes",
        field_placeholder: "Texte",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un texte valide",
        field_inputNum: 1,
      },
    ],
  });
};

exports.getMoveFileToFolder = async function (req, res, next) {
  res.status(200).json({
    page_label: "Déplacer un fichier dans un dossier",
    page_description: "Déplacer un fichier dans un dossier Google Drive",
    reaction_name: "MoveFileToFolder",
    fields: [
      {
        field_id: "fileName",
        field_label: "Nom du fichier",
        field_mandatory: "yes",
        field_placeholder: "Nom du fichier",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un nom de fichier valide",
        field_inputNum: 0,
      },
      {
        field_id: "folderName",
        field_label: "Nom du dossier",
        field_mandatory: "yes",
        field_placeholder: "Nom du dossier",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un nom de dossier valide",
        field_inputNum: 1,
      },
    ],
  });
};

exports.getSendTweet = async function (req, res, next) {
  res.status(200).json({
    page_label: "Envoyer un tweet",
    page_description: "Post un tweet sur votre profile twitter",
    reaction_name: "SendTweet",
    fields: [
      {
        field_id: "tweetMsg",
        field_label: "Message du tweet",
        field_mandatory: "yes",
        field_placeholder: "Message du tweet",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un message valide",
        field_inputNum: 0,
      },
    ],
  });
};

exports.getOutlookSendEmail = async function (req, res, next) {
  res.status(200).json({
    page_label: "Envoyer un mail Outlook",
    page_description:
      "Envoyer un email avec Outlook avec un destinataire, un sujet et un message",
    reaction_name: "OutlookSendEmail",
    fields: [
      {
        field_id: "targetEmail",
        field_label: "Destinataire",
        field_mandatory: "yes",
        field_placeholder: "Destinataire",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un destinataire valide",
        field_inputNum: 0,
      },
      {
        field_id: "subject",
        field_label: "Sujet",
        field_mandatory: "yes",
        field_placeholder: "Sujet",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un sujet valide",
        field_inputNum: 1,
      },
      {
        field_id: "content",
        field_label: "Corps du mail",
        field_mandatory: "yes",
        field_placeholder: "Corps du mail",
        field_type: "text",
        field_value: "",
        field_error: "Veuillez saisir un corps de mail valide",
        field_inputNum: 2,
      },
    ],
  });
};
