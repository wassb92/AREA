exports.getReactions = async function (req, res, next) {
  const reactions = [
    {
      name: "Email",
      description:
        "Envoyer un mail avec un destinataire et un message venant de votre mail",
      img: "https://assets.website-files.com/5ff319852fb4b1c3fc23719b/60461b74bbe19827a199cc4f_60084e45b6186e1f350eb273_Logo%2520Sendgrid.png",
      to: null,
      endpoint: "/area/reactions/SendEmail",
      service: "SendGrid",
    },
    {
      name: "Crée un brouillon Gmail",
      description:
        "Crée un brouillon Gmail avec un destinataire, un sujet et un message venant de votre mail",
      img: "https://cdn-icons-png.flaticon.com/512/281/281769.png",
      to: null,
      endpoint: "/area/reactions/CreateDraft",
      service: "Gmail",
    },
    {
      name: "Crée un label Gmail",
      description: "Crée un label Gmail avec un nom venant de votre mail",
      img: "https://cdn-icons-png.flaticon.com/512/281/281769.png",
      to: null,
      endpoint: "/area/reactions/CreateLabel",
      service: "Gmail",
    },
    {
      name: "Envoyer un mail Gmail",
      description:
        "Envoyer un mail Gmail avec un destinataire, un sujet et un message venant de votre mail",
      img: "https://cdn-icons-png.flaticon.com/512/281/281769.png",
      to: null,
      endpoint: "/area/reactions/SendGmail",
      service: "Gmail",
    },
    {
      name: "Supprime mails indésirables Gmail",
      description: "Supprimer tous les mails indésirables de votre boite mail",
      img: "https://cdn-icons-png.flaticon.com/512/281/281769.png",
      to: null,
      endpoint: "/area/reactions/DeleteJunkMail",
      service: "Gmail",
    },
    {
      name: "Supprimer brouillons Gmail",
      description: "Supprimer tous les brouillons Gmail",
      img: "https://cdn-icons-png.flaticon.com/512/281/281769.png",
      to: null,
      endpoint: "/area/reactions/DeleteDrafts",
      service: "Gmail",
    },
    {
      name: "Étoiler mails non lus Gmail",
      description: "Étoiler tous les mails non lus de votre boite mail",
      img: "https://cdn-icons-png.flaticon.com/512/281/281769.png",
      to: null,
      endpoint: "/area/reactions/StarredNewMail",
      service: "Gmail",
    },
    {
      name: "Créer un calendrier Google Agenda",
      description:
        "Créer un calendrier Google Agenda avec un nom venant de votre mail",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/1024px-Google_Calendar_icon_%282020%29.svg.png",
      to: null,
      endpoint: "/area/reactions/CreateCalendar",
      service: "Google Agenda",
    },
    {
      name: "Créer un évènement Google Agenda",
      description:
        "Créer un évènement Google Agenda avec un titre, une description, une date de début et une date de fin venant de votre mail",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/1024px-Google_Calendar_icon_%282020%29.svg.png",
      to: null,
      endpoint: "/area/reactions/CreateEvent",
      service: "Google Agenda",
    },
    {
      name: "Supprimer un évènement Google Agenda",
      description: "Supprimer un évènement Google Agenda par son sommaire",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/1024px-Google_Calendar_icon_%282020%29.svg.png",
      to: null,
      endpoint: "/area/reactions/DeleteDetailedEvent",
      service: "Google Agenda",
    },
    {
      name: "Inviter à un évènement Google Agenda",
      description:
        "Inviter à un évènement Google Agenda avec un email et un rôle",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/1024px-Google_Calendar_icon_%282020%29.svg.png",
      to: null,
      endpoint: "/area/reactions/InviteToCalendar",
      service: "Google Agenda",
    },
    {
      name: "Mettre à jour un évènement Google Agenda",
      description:
        "Mettre à jour un évènement Google Agenda avec un sommaire, une description, une date de début et une date de fin",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/1024px-Google_Calendar_icon_%282020%29.svg.png",
      to: null,
      endpoint: "/area/reactions/UpdateEvent",
      service: "Google Agenda",
    },
    {
      name: "Envoyer un SMS",
      description: "Envoyer un SMS avec un numéro de téléphone et un message",
      img: "https://toppng.com/uploads/preview/twilio-logo-11609380242jwkoktksba.png",
      to: null,
      endpoint: "/area/reactions/SendSMS",
      service: "Twilio",
    },
    {
      name: "Envoyer un MMS",
      description:
        "Envoyer un MMS avec un numéro de téléphone, message et une image",
      img: "https://toppng.com/uploads/preview/twilio-logo-11609380242jwkoktksba.png",
      to: null,
      endpoint: "/area/reactions/SendMMS",
      service: "Twilio",
    },
    {
      name: "Appeler un numéro",
      description:
        "Appeler un numéro avec un numéro de téléphone et un message",
      img: "https://toppng.com/uploads/preview/twilio-logo-11609380242jwkoktksba.png",
      to: null,
      endpoint: "/area/reactions/Call",
      service: "Twilio",
    },
    {
      name: "Envoyer un message WhatsApp",
      description:
        "Envoyer un message WhatsApp avec à un numéro de téléphone avec un message",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png",
      to: null,
      endpoint: "/area/reactions/WhatsAppSendMessage",
      service: "WhatsApp",
    },
    {
      name: "Envoyer une image WhatsApp",
      description:
        "Envoyer un message et une image WhatsApp à un numéro de téléphone",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png",
      to: null,
      endpoint: "/area/reactions/WhatsAppSendMedia",
      service: "WhatsApp",
    },
    {
      name: "Créer un contact",
      description: "Créer un contact avec un nom, un prénom et un email",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/1200px-Google_Contacts_icon.svg.png",
      to: null,
      endpoint: "/area/reactions/CreateContact",
      service: "Google Contacts",
    },
    {
      name: "Supprimer un contact",
      description: "Supprimer un contact avec un nom et un prénom",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/1200px-Google_Contacts_icon.svg.png",
      to: null,
      endpoint: "/area/reactions/DeleteContact",
      service: "Google Contacts",
    },
    {
      name: "Crée un label Google Contacts",
      description: "Crée un label Google Contacts avec un nom",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/1200px-Google_Contacts_icon.svg.png",
      to: null,
      endpoint: "/area/reactions/CreateContactLabel",
      service: "Google Contacts",
    },
    {
      name: "Supprime un label Google Contacts",
      description: "Supprime un label Google Contacts avec un nom",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/1200px-Google_Contacts_icon.svg.png",
      to: null,
      endpoint: "/area/reactions/DeleteContactLabel",
      service: "Google Contacts",
    },
    {
      name: "Ajoute un contact à un label Google Contacts",
      description:
        "Ajoute un contact à un label Google Contacts avec un nom de contact et un nom de label",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/1200px-Google_Contacts_icon.svg.png",
      to: null,
      endpoint: "/area/reactions/AddContactToLabel",
      service: "Google Contacts",
    },
    {
      name: "Mettre à jour un contact Google Contacts",
      description:
        "Mettre à jour un contact Google Contacts avec un nom de contact, un nom, un prénom, un numéro de téléphone, un email et un label",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/1200px-Google_Contacts_icon.svg.png",
      to: null,
      endpoint: "/area/reactions/UpdateContact",
      service: "Google Contacts",
    },
    {
      name: "Mettre à jour la photo d'un contact Google Contacts",
      description:
        "Mettre à jour la photo d'un contact Google Contacts avec un nom de contact et une image",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/1200px-Google_Contacts_icon.svg.png",
      to: null,
      endpoint: "/area/reactions/UpdateContactPhoto",
      service: "Google Contacts",
    },
    {
      name: "Mettre à jour un fichier texte",
      description:
        "Mettre à jour un fichier texte avec un nom de fichier et un texte",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Qw4izG59ENBQITZpnFJBmbw42HLF3iH2l6q1IEFl44Bw87tJessAoiv9mabXllOZOMs&usqp=CAU",
      to: null,
      endpoint: "/area/reactions/UpdateTextToFile",
      service: "Google Drive",
    },
    {
      name: "Créer un document",
      description: "Créer un document avec un nom de fichier et un texte",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Qw4izG59ENBQITZpnFJBmbw42HLF3iH2l6q1IEFl44Bw87tJessAoiv9mabXllOZOMs&usqp=CAU",
      to: null,
      endpoint: "/area/reactions/CreateDocument",
      service: "Google Drive",
    },
    {
      name: "Déplacer un fichier dans un dossier",
      description:
        "Déplacer un fichier dans un dossier avec un nom de fichier et un nom de dossier",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Qw4izG59ENBQITZpnFJBmbw42HLF3iH2l6q1IEFl44Bw87tJessAoiv9mabXllOZOMs&usqp=CAU",
      to: null,
      endpoint: "/area/reactions/MoveFileToFolder",
      service: "Google Drive",
    },
    {
      name: "Envoyer un tweet",
      description: "Envoyer un tweet avec un message",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW3LvfWjjZJyF-j-QtUrBLfbYvb46K9n6tIHYsmusn&s",
      to: null,
      endpoint: "/area/reactions/SendTweet",
      service: "Twitter",
    },
    {
      name: "Envoyer un email Outlook",
      description:
        "Envoyer un email avec Outlook avec un destinataire, un sujet et un message",
      img: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
      to: null,
      endpoint: "/area/reactions/OutlookSendEmail",
      service: "Microsoft",
    },
  ];
  res.status(200).json(reactions);
};
