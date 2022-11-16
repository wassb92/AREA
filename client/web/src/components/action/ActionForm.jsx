import React, { useState, useEffect } from "react";
import Element from "components/form/Element";
import { FormContext } from "FormContext";
import ActionCard from "components/custom/ActionCard";
import reactionsByName from "components/reactions";
import axios from "axios";
import Accordion from "components/custom/Accordion";

const ActionForm = ({ formJSON }) => {
  const [elements, setElements] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [reactionSelected, setReactionSelected] = useState(null);

  const TradReaction = {
    Email: "Email",
    "Crée un brouillon Gmail": "GmailCreateDraft",
    "Crée un label Gmail": "GmailCreateLabel",
    "Envoyer un mail Gmail": "GmailSendGmail",
    "Supprime mails indésirables Gmail": "GmailDeleteJunkMail",
    "Supprimer brouillons Gmail": "GmailDeleteDrafts",
    "Étoiler mails non lus Gmail": "GmailStarredNewMail",
    "Créer un calendrier Google Agenda": "GmailCreateCalendar",
    "Créer un évènement Google Agenda": "GmailCreateEvent",
    "Supprimer un évènement Google Agenda": "GmailDeleteEvent",
    "Inviter à un évènement Google Agenda": "GmailInviteEvent",
    "Mettre à jour un évènement Google Agenda": "GmailUpdateEvent",
    "Envoyer un SMS": "SendSMS",
    "Envoyer un MMS": "SendMMS",
    "Appeler un numéro": "Call",
    "Envoyer un message WhatsApp": "WhatsAppSendMessage",
    "Envoyer une image WhatsApp": "WhatsAppSendMedia",
    "Crée un label Google Contacts": "CreateContactLabel",
    "Supprime un label Google Contacts": "DeleteContactLabel",
    "Ajoute un contact à un label Google Contacts": "AddContactToLabel",
    "Mettre à jour un contact Google Contacts": "UpdateContact",
    "Mettre à jour la photo d'un contact Google Contacts": "UpdateContactPhoto",
    "Mettre à jour un fichier texte": "UpdateTextToFile",
    "Créer un document": "CreateDocument",
    "Déplacer un fichier dans un dossier": "MoveFileToFolder",
    "Envoyer un tweet": "SendTweet",
    "Envoyer un email Outlook": "OutlookSendEmail",
    "Créer un contact": "CreateContact",
    "Supprimer un contact": "DeleteContact",
  };

  useEffect(() => {
    const getReactions = async () => {
      try {
        const res = await axios.get(
          `${global.API_ENDPOINT}/api/area/reactions`
        );
        setReactions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getReactions();
  }, []);

  useEffect(() => {
    setElements(formJSON);
  }, [formJSON]);

  const Gmail = reactions.filter((reaction) => reaction.service === "Gmail");
  const GoogleAgenda = reactions.filter(
    (reaction) => reaction.service === "Google Agenda"
  );
  const GoogleDrive = reactions.filter(
    (reaction) => reaction.service === "Google Drive"
  );
  const GoogleContacts = reactions.filter(
    (reaction) => reaction.service === "Google Contacts"
  );
  const OpenWeatherMap = reactions.filter(
    (reaction) => reaction.service === "OpenWeatherMap"
  );
  const SendGrid = reactions.filter(
    (reaction) => reaction.service === "SendGrid"
  );
  const Twilio = reactions.filter((reaction) => reaction.service === "Twilio");
  const WhatsApp = reactions.filter(
    (reaction) => reaction.service === "WhatsApp"
  );
  const Twitter = reactions.filter(
    (reaction) => reaction.service === "Twitter"
  );
  const Microsoft = reactions.filter(
    (reaction) => reaction.service === "Microsoft"
  );
  const Else = reactions.filter((reaction) => reaction.service === "Else");

  const { fields, page_label, page_description, action_name } = elements ?? {};

  const handleChange = (id, event) => {
    const newElements = { ...elements };
    newElements.fields.forEach((field) => {
      const { field_type, field_id } = field;
      if (id === field_id) {
        switch (field_type) {
          case "checkbox":
            field["field_value"] = event.target.checked;
            break;

          default:
            field["field_value"] = event.target.value;
            break;
        }
      }
      setElements(newElements);
    });
    // console.log(elements);
  };

  const handleSelectReaction = (reaction) => {
    window.scrollTo({
      top: document.body.scrollHeight * 2,
      behavior: "smooth",
    });
    setReactionSelected(reaction);
  };

  const ListReactions = () => {
    return (
      <div>
        <div className="flex flex-wrap gap-4 mx-4">
          <div className="w-full space-y-4">
            {reactions.length !==
              Gmail.length +
                GoogleAgenda.length +
                GoogleDrive.length +
                GoogleContacts.length +
                OpenWeatherMap.length +
                SendGrid.length +
                Twilio.length +
                WhatsApp.length +
                Twitter.length +
                Microsoft.length +
                Else.length && (
              <div className="text-3xl text-center text-red-600">
                Un service n'est pas reconnu
              </div>
            )}

            {Gmail.length > 0 && (
              <Accordion header="Gmail">
                {Gmail.map((reaction, index) => (
                  <div
                    key={`reaction_${index}`}
                    onClick={() => handleSelectReaction(reaction)}
                  >
                    <ActionCard
                      name={reaction.name}
                      description={reaction.description}
                      img={reaction.img}
                      to={reaction.to}
                    />
                  </div>
                ))}
              </Accordion>
            )}
            {GoogleAgenda.length > 0 && (
              <Accordion header="Google Agenda">
                {GoogleAgenda.map((reaction, index) => (
                  <div
                    key={`reaction_${index}`}
                    onClick={() => handleSelectReaction(reaction)}
                  >
                    <ActionCard
                      name={reaction.name}
                      description={reaction.description}
                      img={reaction.img}
                      to={reaction.to}
                    />
                  </div>
                ))}
              </Accordion>
            )}
            {GoogleDrive.length > 0 && (
              <Accordion header="Google Drive">
                {GoogleDrive.map((reaction, index) => (
                  <div
                    key={`reaction_${index}`}
                    onClick={() => handleSelectReaction(reaction)}
                  >
                    <ActionCard
                      name={reaction.name}
                      description={reaction.description}
                      img={reaction.img}
                      to={reaction.to}
                    />
                  </div>
                ))}
              </Accordion>
            )}
            {GoogleContacts.length > 0 && (
              <Accordion header="Google Contacts">
                {GoogleContacts.map((reaction, index) => (
                  <div
                    key={`reaction_${index}`}
                    onClick={() => handleSelectReaction(reaction)}
                  >
                    <ActionCard
                      name={reaction.name}
                      description={reaction.description}
                      img={reaction.img}
                      to={reaction.to}
                    />
                  </div>
                ))}
              </Accordion>
            )}
            {Twitter.length > 0 && (
              <Accordion header="Twitter">
                {Twitter.map((reaction, index) => (
                  <div
                    key={`reaction_${index}`}
                    onClick={() => handleSelectReaction(reaction)}
                  >
                    <ActionCard
                      name={reaction.name}
                      description={reaction.description}
                      img={reaction.img}
                      to={reaction.to}
                    />
                  </div>
                ))}
              </Accordion>
            )}
            {Microsoft.length > 0 && (
              <Accordion header="Microsoft">
                {Microsoft.map((reaction, index) => (
                  <div
                    key={`reaction_${index}`}
                    onClick={() => handleSelectReaction(reaction)}
                  >
                    <ActionCard
                      name={reaction.name}
                      description={reaction.description}
                      img={reaction.img}
                      to={reaction.to}
                    />
                  </div>
                ))}
              </Accordion>
            )}
            {SendGrid.length > 0 && (
              <Accordion header="SendGrid">
                {SendGrid.map((reaction, index) => (
                  <div
                    key={`reaction_${index}`}
                    onClick={() => handleSelectReaction(reaction)}
                  >
                    <ActionCard
                      name={reaction.name}
                      description={reaction.description}
                      img={reaction.img}
                      to={reaction.to}
                    />
                  </div>
                ))}
              </Accordion>
            )}
            {Twilio.length > 0 && (
              <Accordion header="Twilio">
                {Twilio.map((reaction, index) => (
                  <div
                    key={`reaction_${index}`}
                    onClick={() => handleSelectReaction(reaction)}
                  >
                    <ActionCard
                      name={reaction.name}
                      description={reaction.description}
                      img={reaction.img}
                      to={reaction.to}
                    />
                  </div>
                ))}
              </Accordion>
            )}
            {WhatsApp.length > 0 && (
              <Accordion header="WhatsApp">
                {WhatsApp.map((reaction, index) => (
                  <div
                    key={`reaction_${index}`}
                    onClick={() => handleSelectReaction(reaction)}
                  >
                    <ActionCard
                      name={reaction.name}
                      description={reaction.description}
                      img={reaction.img}
                      to={reaction.to}
                    />
                  </div>
                ))}
              </Accordion>
            )}
            {Else.length > 0 && (
              <Accordion header="Autre">
                {Else.map((reaction, index) => (
                  <div
                    key={`reaction_${index}`}
                    onClick={() => handleSelectReaction(reaction)}
                  >
                    <ActionCard
                      name={reaction.name}
                      description={reaction.description}
                      img={reaction.img}
                      to={reaction.to}
                    />
                  </div>
                ))}
              </Accordion>
            )}
          </div>
        </div>
        {reactionSelected && (
          <div className="text-center px-8 py-16 mb-8 space-y-4">
            <h2 className="text-5xl">{reactionSelected.name}</h2>
            <p className="text-xl">{reactionSelected.description}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <FormContext.Provider value={{ handleChange }}>
      <div className="flex justify-center items-center flex-col">
        <div className="text-center px-8 py-16 mb-8">
          <h2 className="text-5xl">{page_label}</h2>
          <p className="text-xl">{page_description}</p>
        </div>
        <form>
          <div className="flex- justify-center">
            {fields &&
              fields.map((field, i) => <Element key={i} field={field} />)}
          </div>
        </form>
      </div>
      <ListReactions />
      {reactionSelected &&
        reactionsByName({
          action: {
            name: action_name,
            args: {
              ...Object.fromEntries(
                fields.map(({ field_id, field_value }) => [
                  field_id,
                  field_value,
                ])
              ),
            },
          },
        })[TradReaction[reactionSelected.name]]}
    </FormContext.Provider>
  );
};

export default ActionForm;
