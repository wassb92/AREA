const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  const about = {
    client: {
      host: req.headers.host.split(":")[0],
    },
    server: {
      current_time: Date.now(),
      services: [
        {
          name: "Gmail",
          actions: [
            {
              name: "TriggerWhenNewDraft",
              description:
                "Déclencher une réaction si un nouveau brouillon est créé",
            },
            {
              name: "TriggerWhenNewMail",
              description:
                "Déclencher une réaction si un nouveau mail est reçu",
            },
            {
              name: "TriggerWhenNewLabel",
              description:
                "Déclencher une réaction si un nouveau label est créé",
            },
            {
              name: "TriggerWhenNewStarredMail",
              description:
                "Déclencher une réaction si un nouveau mail est étoilé",
            },
            {
              name: "TriggerWhenNewAttachment",
              description:
                "Déclencher une réaction si un nouveau mail avec PJ est reçu",
            },
            {
              name: "TriggerWhenNewEmailMatchingSearch",
              description:
                "Déclencher une réaction si un nouveau mail avec recherche est reçu",
            },
            {
              name: "TriggerWhenNewThread",
              description:
                "Déclencher une réaction si un nouveau thread est créé",
            },
            {
              name: "TriggerWhenDeletedMail",
              description: "Déclencher une réaction si un mail est supprimé",
            },
          ],
          reactions: [
            {
              name: "CreateDraft",
              description: "Créer un brouillon dans votre Gmail",
            },
            {
              name: "CreateLabel",
              description:
                "Crée un label Gmail avec un nom venant de votre mail",
            },
            {
              name: "SendGmail",
              description:
                "Envoyer un mail Gmail avec un destinataire, un sujet et un message venant de votre mail",
            },
            {
              name: "DeleteJunkMail",
              description:
                "Supprimer tous les mails indésirables de votre boite mail",
            },
            {
              name: "DeleteDrafts",
              description: "Supprimer tous les brouillons Gmail",
            },
            {
              name: "StarredNewMail",
              description: "Étoiler tous les nouveaux mails Gmail",
            },
          ],
        },
        {
          name: "Google Agenda",
          actions: [
            {
              name: "TriggerWhenNewCalendar",
              description:
                "Déclencher une réaction si un nouveau calendrier est créé",
            },
            {
              name: "TriggerWhenNewCalendarEvent",
              description:
                "Déclencher une réaction si un nouvel évènement est créé",
            },
            {
              name: "TriggerWhenEventCanceled",
              description: "Déclencher une réaction si un évènement est annulé",
            },
            {
              name: "TriggerWhenEventEnded",
              description:
                "Déclencher une réaction si un évènement est terminé",
            },
            {
              name: "TriggerWhenEventStarted",
              description:
                "Déclencher une réaction si un évènement est commencé",
            },
          ],
          reactions: [
            {
              name: "CreateCalendar",
              description:
                "Créer un calendrier Google Agenda avec un nom venant de votre mail",
            },
            {
              name: "CreateEvent",
              description:
                "Créer un évènement Google Agenda avec un titre, une description, une date de début et une date de fin venant de votre mail",
            },
            {
              name: "DeleteDetailedEvent",
              description:
                "Supprimer un évènement Google Agenda par son sommaire",
            },
            {
              name: "InviteToCalendar",
              description:
                "Inviter à un évènement Google Agenda avec un email et un rôle",
            },
            {
              name: "UpdateEvent",
              description:
                "Mettre à jour un évènement Google Agenda avec un sommaire, une description, une date de début et une date de fin",
            },
          ],
        },
        {
          name: "Google Contacts",
          actions: [
            {
              name: "TriggerWhenContactDeleted",
              description: "Déclencher une réaction si un contact est supprimé",
            },
            {
              name: "TriggerWhenNewContactLabel",
              description:
                "Déclencher une réaction si un nouveau label est créé",
            },
            {
              description:
                "Déclencher une réaction si un nouveau contact est créé",
              name: "TriggerWhenNewContact",
            },
          ],
          reactions: [
            {
              name: "CreateContact",
              description:
                "Créer un contact avec un nom, un prénom et un email",
            },
            {
              name: "DeleteContact",
              description: "Supprimer un contact avec un nom et un prénom",
            },
            {
              name: "CreateContactLabel",
              description: "Crée un label Google Contacts avec un nom",
            },
            {
              name: "DeleteContactLabel",
              description: "Supprime un label Google Contacts avec un nom",
            },
            {
              name: "AddContactToLabel",
              description:
                "Ajoute un contact à un label Google Contacts avec un nom de contact et un nom de label",
            },
            {
              name: "UpdateContact",
              description:
                "Mettre à jour un contact Google Contacts avec un nom de contact, un nom, un prénom, un numéro de téléphone, un email et un label",
            },
            {
              name: "UpdateContactPhoto",
              description:
                "Mettre à jour la photo d'un contact Google Contacts avec un nom de contact et une image",
            },
          ],
        },
        {
          name: "Google Docs",
          actions: [
            {
              name: "TriggerWhenNewDoc",
              description:
                "Déclencher une réaction si un nouveau document est créé",
            },
            {
              name: "TriggerWhenDocDeleted",
              description:
                "Déclencher une réaction si un document est supprimé",
            },
          ],
          reactions: [],
        },
        {
          name: "OpenWeatherMap",
          actions: [
            {
              name: "TriggerWhenTempReached",
              description:
                "Déclencher une réaction si la température est atteinte",
            },
            {
              name: "TriggerWhenTempDropped",
              description: "Déclencher une réaction si la température chute",
            },
            {
              name: "TriggerWhenTempRise",
              description: "Déclencher une réaction si la température augmente",
            },
            {
              name: "TriggerWhenWeatherReached",
              description:
                "Déclencher une réaction si le temps recherché est atteint",
            },
          ],
          reactions: [],
        },
        {
          name: "Google Drive",
          actions: [],
          reactions: [
            {
              name: "UpdateTextToFile",
              description:
                "Mettre à jour un fichier texte avec un nom de fichier et un texte",
            },
            {
              name: "CreateDocument",
              description:
                "Créer un document avec un nom de fichier et un texte",
            },
            {
              name: "MoveFileToFolder",
              description:
                "Déplacer un fichier dans un dossier avec un nom de fichier et un nom de dossier",
            },
          ],
        },
        {
          name: "Google Tasks",
          actions: [
            {
              name: "TriggerWhenNewTask",
              description:
                "Déclencher une réaction si une nouvelle tâche est créée",
            },
          ],
          reactions: [],
        },
        {
          name: "Twilio",
          actions: [],
          reactions: [
            {
              name: "/area/reactions/SendSMS",
              description:
                "Envoyer un SMS avec un numéro de téléphone et un message",
            },
            {
              name: "/area/reactions/SendMMS",
              description:
                "Envoyer un MMS avec un numéro de téléphone, message et une image",
            },
            {
              name: "/area/reactions/Call",
              description:
                "Appeler un numéro avec un numéro de téléphone et un message",
            },
          ],
        },
        {
          name: "WhatsApp",
          actions: [],
          reactions: [
            {
              name: "WhatsAppSendMessage",
              description:
                "Envoyer un message WhatsApp avec à un numéro de téléphone avec un message",
            },
            {
              name: "WhatsAppSendMedia",
              description:
                "Envoyer un message et une image WhatsApp à un numéro de téléphone",
            },
          ],
        },
        {
          name: "Facebook",
          actions: [
            {
              name: "TriggerWhenFacebookNameUpdated",
              description:
                "Déclencher une réaction si le nom Facebook est mis à jour",
            },
            {
              name: "TriggerWhenFacebookProfilePictureUpdated",
              description:
                "Déclencher une réaction si la photo de profil Facebook est mise à jour",
            },
          ],
          reactions: [],
        },
        {
          name: "Discord",
          actions: [
            {
              name: "TriggerWhenDiscordNameUpdated",
              description:
                "Déclencher une réaction si le nom Discord est mis à jour",
            },
          ],
          reactions: [],
        },
        {
          name: "Twitter",
          actions: [],
          reactions: [
            {
              name: "SendTweet",
              description: "Envoyer un tweet avec un message",
            },
          ],
        },
        {
          name: "Microsoft",
          actions: [],
          reactions: [
            {
              name: "OutlookSendEmail",
              description:
                "Envoyer un email avec Outlook avec un destinataire, un sujet et un message",
            },
          ],
        },
        {
          name: "SendGrid",
          actions: [],
          reactions: [
            {
              name: "SendEmail",
              description:
                "Envoyer un mail avec un destinataire et un message venant de votre mail",
            },
          ],
        },
        {
          name: "Extra",
          actions: [
            {
              name: "UniqueTimer",
              description: "Choisir un créneau pour éxécuter une réaction",
            },
          ],
          reactions: [],
        },
      ],
    },
  };
  res.status(200).json(about);
});

module.exports = router;
