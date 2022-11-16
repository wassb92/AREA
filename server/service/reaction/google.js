const client = require("../config/google");
const { google } = require("googleapis");
const fetch = require("node-fetch");

class Google {
  static async CreateDraft(area) {
    try {
      console.log("CreateDraft reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const gmail = google.gmail({ version: "v1", auth: client });
      const draft = await gmail.users.drafts.create({
        userId: "me",
        headers: { "content-type": "message/rfc822" },
        requestBody: {
          message: {
            raw: Buffer.from(
              `To: ${area.reaction.args.to}\r\nFrom: ${area.user.google.email}\r\nSubject: ${area.reaction.args.subject}\r\n\r\n${area.reaction.args.body}`
            ).toString("base64"),
          },
        },
      });
      console.log("created draft successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async CreateLabel(area) {
    try {
      console.log("CreateLabel reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const gmail = google.gmail({ version: "v1", auth: client });
      const label = await gmail.users.labels.create({
        userId: "me",
        requestBody: {
          name: area.reaction.args.name,
        },
      });
      console.log("created label successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async SendGmail(area) {
    try {
      console.log("SendGmail reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const gmail = google.gmail({ version: "v1", auth: client });
      const email = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: Buffer.from(
            `To: ${area.reaction.args.to}\r\nFrom: ${area.user.google.email}\r\nSubject: ${area.reaction.args.subject}\r\n\r\n${area.reaction.args.body}`
          ).toString("base64"),
        },
      });
      console.log("sent email successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async DeleteJunkMail(area) {
    try {
      console.log("DeleteJunkMail reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const gmail = google.gmail({ version: "v1", auth: client });
      const res = await gmail.users.messages.list({
        userId: "me",
        labelIds: ["SPAM"],
      });
      if (!res.data.messages) return;
      for (let i = 0; i < res.data.messages.length; i++) {
        await gmail.users.messages.delete({
          userId: "me",
          id: res.data.messages[i].id,
        });
      }
      console.log("deleted all junk mail successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async DeleteDrafts(area) {
    try {
      console.log("DeleteDrafts reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const gmail = google.gmail({ version: "v1", auth: client });
      const res = await gmail.users.drafts.list({
        userId: "me",
      });
      if (!res.data.drafts) return console.log("no drafts to delete");
      for (let i = 0; i < res.data.drafts.length; i++) {
        await gmail.users.drafts.delete({
          userId: "me",
          id: res.data.drafts[i].id,
        });
      }
      console.log("deleted all drafts successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async StarredNewMail(area) {
    try {
      console.log("StarredNewMail reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const gmail = google.gmail({ version: "v1", auth: client });
      const res = await gmail.users.messages.list({
        userId: "me",
        q: "is:unread",
        labelIds: ["INBOX"],
      });
      for (let i = 0; i < res.data.messages.length; i++) {
        await gmail.users.messages.modify({
          userId: "me",
          id: res.data.messages[i].id,
          requestBody: {
            addLabelIds: ["STARRED"],
          },
        });
      }
      console.log("starred all new mail successfully");
    } catch (err) {
      console.log(err);
    }
  }

  // calendar
  static async CreateCalendar(area) {
    try {
      console.log("CreateCalendar reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const calendar = google.calendar({ version: "v3", auth: client });
      const res = await calendar.calendars.insert({
        requestBody: {
          summary: area.reaction.args.summary,
          description: area.reaction.args.description,
          timeZone: "Europe/Paris",
        },
      });
      console.log("created calendar successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async CreateEvent(area) {
    try {
      console.log("CreateEvent reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const calendar = google.calendar({ version: "v3", auth: client });
      var start = new Date(area.reaction.args.start);
      var end = new Date(area.reaction.args.end);
      start.setHours(start.getHours() - 1);
      end.setHours(end.getHours() - 1);
      const res = await calendar.events.insert({
        calendarId: "primary",
        requestBody: {
          summary: area.reaction.args.summary,
          description: area.reaction.args.description,
          start: {
            dateTime: start,
          },
          end: {
            dateTime: end,
          },
        },
      });
      console.log("created event successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async DeleteDetailedEvent(area) {
    try {
      console.log("DeleteDetailedEvent reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const calendar = google.calendar({ version: "v3", auth: client });
      const res = await calendar.events.list({
        calendarId: "primary",
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      });
      for (let i = 0; i < res.data.items.length; i++) {
        if (res.data.items[i].summary === area.reaction.args.summary) {
          await calendar.events.delete({
            calendarId: "primary",
            eventId: res.data.items[i].id,
          });
        }
      }
      console.log("deleted detailed event successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async InviteToCalendar(area) {
    try {
      console.log("InviteToCalendar reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const calendar = google.calendar({ version: "v3", auth: client });
      const res = await calendar.acl.insert({
        calendarId: "primary",
        requestBody: {
          role: "reader",
          scope: {
            type: "user",
            value: area.reaction.args.email,
          },
        },
      });
      console.log("invited to calendar successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async UpdateEvent(area) {
    try {
      console.log("UpdateEvent reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const calendar = google.calendar({ version: "v3", auth: client });
      const res = await calendar.events.list({
        calendarId: "primary",
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      });
      var newStart = new Date(area.reaction.args.newStart);
      newStart.setHours(newStart.getHours() - 1);
      var newEnd = new Date(area.reaction.args.newEnd);
      newEnd.setHours(newEnd.getHours() - 1);
      for (let i = 0; i < res.data.items.length; i++) {
        if (res.data.items[i].summary === area.reaction.args.summary) {
          await calendar.events.update({
            calendarId: "primary",
            eventId: res.data.items[i].id,
            requestBody: {
              summary: area.reaction.args.newSummary,
              description: area.reaction.args.newDescription,
              start: {
                dateTime: newStart,
                timeZone: "Europe/Paris",
              },
              end: {
                dateTime: newEnd,
                timeZone: "Europe/Paris",
              },
            },
          });
          break;
        }
      }
      console.log("updated event successfully");
    } catch (err) {
      console.log(err);
    }
  }

  // contacts
  static async CreateContact(area) {
    try {
      console.log("CreateContact reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const people = google.people({ version: "v1", auth: client });
      const res = await people.people.createContact({
        requestBody: {
          names: [
            {
              givenName: area.reaction.args.givenName,
              familyName: area.reaction.args.familyName,
            },
          ],
          emailAddresses: [
            {
              value: area.reaction.args.email,
              type: "work",
            },
          ],
        },
      });
      console.log("created contact successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async DeleteContact(area) {
    try {
      console.log("DeleteContact reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const people = google.people({ version: "v1", auth: client });
      const res = await people.people.connections.list({
        resourceName: "people/me",
        personFields: "names",
      });
      for (let i = 0; i < res.data.connections.length; i++) {
        if (
          res.data.connections[i].names[0].givenName ===
            area.reaction.args.givenName &&
          res.data.connections[i].names[0].familyName ===
            area.reaction.args.familyName
        ) {
          await people.people.deleteContact({
            resourceName: res.data.connections[i].resourceName,
          });
          break;
        }
      }
      console.log("deleted contact successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async CreateContactLabel(area) {
    try {
      console.log("CreateContactLabel reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const people = google.people({ version: "v1", auth: client });
      const res = await people.contactGroups.create({
        requestBody: {
          contactGroup: {
            name: area.reaction.args.labelName,
          },
        },
      });
      console.log("created contact label successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async DeleteContactLabel(area) {
    try {
      console.log("DeleteContactLabel reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const people = google.people({ version: "v1", auth: client });
      const res = await people.contactGroups.list();
      for (let i = 0; i < res.data.contactGroups.length; i++) {
        if (res.data.contactGroups[i].name === area.reaction.args.labelName) {
          await people.contactGroups.delete({
            resourceName: res.data.contactGroups[i].resourceName,
          });
          break;
        }
      }
      console.log("deleted contact label successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async AddContactToLabel(area) {
    try {
      console.log("AddContactToLabel reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const people = google.people({ version: "v1", auth: client });
      const res = await people.people.connections.list({
        resourceName: "people/me",
        personFields: "names",
      });
      for (let i = 0; i < res.data.connections.length; i++) {
        if (
          res.data.connections[i].names[0].givenName ===
            area.reaction.args.givenName &&
          res.data.connections[i].names[0].familyName ===
            area.reaction.args.familyName
        ) {
          const res2 = await people.contactGroups.list();
          for (let j = 0; j < res2.data.contactGroups.length; j++) {
            if (res2.data.contactGroups[j].name === area.reaction.args.label) {
              await people.contactGroups.members.modify({
                resourceName: res2.data.contactGroups[j].resourceName,
                requestBody: {
                  resourceNamesToAdd: [res.data.connections[i].resourceName],
                },
              });
              break;
            }
          }
          break;
        }
      }
      console.log("added contact to label successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async UpdateContact(area) {
    try {
      console.log("UpdateContact reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const people = google.people({ version: "v1", auth: client });
      const res = await people.people.connections.list({
        resourceName: "people/me",
        personFields: "names",
      });
      for (let i = 0; i < res.data.connections.length; i++) {
        if (
          res.data.connections[i].names[0].givenName ===
            area.reaction.args.givenName &&
          res.data.connections[i].names[0].familyName ===
            area.reaction.args.familyName
        ) {
          await people.people.updateContact({
            resourceName: res.data.connections[i].resourceName,
            updatePersonFields: "names,emailAddresses",
            requestBody: {
              etag: res.data.connections[i].etag,
              names: [
                {
                  givenName: area.reaction.args.newGivenName,
                  familyName: area.reaction.args.newFamilyName,
                },
              ],
              emailAddresses: [
                {
                  value: area.reaction.args.newEmail,
                  type: "work",
                },
              ],
            },
          });
          break;
        }
      }
      console.log("updated contact successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async UpdateContactPhoto(area) {
    try {
      console.log("UpdateContactPhoto reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      var photo = await fetch(area.reaction.args.photoUrl);
      var photoBuffer = await photo.buffer();
      google.options({ auth: client });
      const people = google.people({ version: "v1", auth: client });
      const res = await people.people.connections.list({
        resourceName: "people/me",
        personFields: "names",
      });
      for (let i = 0; i < res.data.connections.length; i++) {
        if (
          res.data.connections[i].names[0].givenName ===
            area.reaction.args.givenName &&
          res.data.connections[i].names[0].familyName ===
            area.reaction.args.familyName
        ) {
          await people.people.updateContactPhoto({
            resourceName: res.data.connections[i].resourceName,
            requestBody: {
              photoBytes: Buffer.from(photoBuffer).toString("base64"),
            },
          });
          break;
        }
      }
      console.log("updated contact photo successfully");
    } catch (err) {
      console.log(err);
    }
  }

  // drive
  static async UpdateTextToFile(area) {
    try {
      console.log("UpdateTextToFile reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const drive = google.drive({ version: "v3", auth: client });
      const res = await drive.files.list({
        q: `name='${area.reaction.args.fileName}'`,
      });
      const text = area.reaction.args.text;
      await drive.files.update({
        fileId: res.data.files[0].id,
        media: {
          mimeType: "text/plain",
          body: text,
        },
      });
      console.log("Updateed text to file successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async CreateDocument(area) {
    try {
      console.log("CreateDocument reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const drive = google.drive({ version: "v3", auth: client });
      const res = await drive.files.create({
        requestBody: {
          name: area.reaction.args.fileName,
          mimeType: "application/vnd.google-apps.document",
        },
      });
      await drive.files.update({
        fileId: res.data.id,
        media: {
          mimeType: "text/plain",
          body: area.reaction.args.text,
        },
      });
      console.log("Created document successfully");
    } catch (err) {
      console.log(err);
    }
  }

  static async MoveFileToFolder(area) {
    try {
      console.log("MoveFileTOFolder reaction called");
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      google.options({ auth: client });
      const drive = google.drive({ version: "v3", auth: client });
      const res = await drive.files.list({
        q: `name='${area.reaction.args.fileName}'`,
      });
      const res2 = await drive.files.list({
        q: `name='${area.reaction.args.folderName}'`,
      });
      console.log(res2.data.files[0].id, res.data.files[0].id);
      await drive.files.update({
        fileId: res.data.files[0].id,
        addParents: res2.data.files[0].id,
      });
      console.log("Moved file to folder successfully");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Google;
