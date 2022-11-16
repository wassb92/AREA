import React from "react";
import Reaction from "./reaction/Reaction";

const Layout = ({ children }) => {
  return (
    <div className="mt-10 flex justify-center text-center">{children}</div>
  );
};

const reactionsByName = (props) => {
  const data = {
    Email: (
      <Layout children={<Reaction reaction_name="SendEmail" props={props} />} />
    ),
    GmailCreateDraft: (
      <Layout
        children={<Reaction reaction_name="CreateDraft" props={props} />}
      />
    ),
    GmailCreateLabel: (
      <Layout
        children={<Reaction reaction_name="CreateLabel" props={props} />}
      />
    ),
    GmailSendGmail: (
      <Layout children={<Reaction reaction_name="SendGmail" props={props} />} />
    ),
    GmailDeleteJunkMail: (
      <Layout
        children={<Reaction reaction_name="DeleteJunkMail" props={props} />}
      />
    ),
    GmailDeleteDrafts: (
      <Layout
        children={<Reaction reaction_name="DeleteDrafts" props={props} />}
      />
    ),
    GmailStarredNewMail: (
      <Layout
        children={<Reaction reaction_name="StarredNewMail" props={props} />}
      />
    ),
    GmailCreateCalendar: (
      <Layout
        children={<Reaction reaction_name="CreateCalendar" props={props} />}
      />
    ),
    GmailCreateEvent: (
      <Layout
        children={<Reaction reaction_name="CreateEvent" props={props} />}
      />
    ),
    GmailDeleteEvent: (
      <Layout
        children={
          <Reaction reaction_name="DeleteDetailedEvent" props={props} />
        }
      />
    ),
    GmailInviteEvent: (
      <Layout
        children={<Reaction reaction_name="InviteToCalendar" props={props} />}
      />
    ),
    GmailUpdateEvent: (
      <Layout
        children={<Reaction reaction_name="UpdateEvent" props={props} />}
      />
    ),
    CreateContact: (
      <Layout
        children={<Reaction reaction_name="CreateContact" props={props} />}
      />
    ),
    DeleteContact: (
      <Layout
        children={<Reaction reaction_name="DeleteContact" props={props} />}
      />
    ),
    SendSMS: (
      <Layout children={<Reaction reaction_name="SendSMS" props={props} />} />
    ),
    SendMMS: (
      <Layout children={<Reaction reaction_name="SendMMS" props={props} />} />
    ),
    Call: <Layout children={<Reaction reaction_name="Call" props={props} />} />,
    WhatsAppSendMessage: (
      <Layout
        children={
          <Reaction reaction_name="WhatsAppSendMessage" props={props} />
        }
      />
    ),
    WhatsAppSendMedia: (
      <Layout
        children={<Reaction reaction_name="WhatsAppSendMedia" props={props} />}
      />
    ),
    CreateContactLabel: (
      <Layout
        children={<Reaction reaction_name="CreateContactLabel" props={props} />}
      />
    ),
    DeleteContactLabel: (
      <Layout
        children={<Reaction reaction_name="DeleteContactLabel" props={props} />}
      />
    ),
    AddContactToLabel: (
      <Layout
        children={<Reaction reaction_name="AddContactToLabel" props={props} />}
      />
    ),
    UpdateContact: (
      <Layout
        children={<Reaction reaction_name="UpdateContact" props={props} />}
      />
    ),
    UpdateContactPhoto: (
      <Layout
        children={<Reaction reaction_name="UpdateContactPhoto" props={props} />}
      />
    ),
    UpdateTextToFile: (
      <Layout
        children={<Reaction reaction_name="UpdateTextToFile" props={props} />}
      />
    ),
    CreateDocument: (
      <Layout
        children={<Reaction reaction_name="CreateDocument" props={props} />}
      />
    ),
    MoveFileToFolder: (
      <Layout
        children={<Reaction reaction_name="MoveFileToFolder" props={props} />}
      />
    ),
    SendTweet: (
      <Layout children={<Reaction reaction_name="SendTweet" props={props} />} />
    ),
    OutlookSendEmail: (
      <Layout children={<Reaction reaction_name="OutlookSendEmail" props={props} />} />
    ),
  };

  return data;
};

export default reactionsByName;
