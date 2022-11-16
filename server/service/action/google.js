const processReaction = require("../reactionService");
const client = require("../config/google");
const { google } = require("googleapis");
var schedule = require("node-schedule");

class Google {
  static async TriggerWhenNewMail(area) {
    console.log("TriggerWhenNewMail called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const gmail = google.gmail({ version: "v1", auth: client });
      const res = await gmail.users.messages.list({
        userId: "me",
        q: "label:inbox",
      });
      if (res.data.resultSizeEstimate > area.user.google.mailCounter) {
        console.log("found a new mail");
        await processReaction(area);
      }
      area.user.google.mailCounter = res.data.resultSizeEstimate;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenDeletedMail(area) {
    console.log("TriggerWhenDeletedMail called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const gmail = google.gmail({ version: "v1", auth: client });
      const res = await gmail.users.messages.list({
        userId: "me",
        q: "label:inbox",
      });
      if (res.data.resultSizeEstimate < area.user.google.mailCounter) {
        console.log("deleted a mail");
        await processReaction(area);
      }
      area.user.google.mailCounter = res.data.resultSizeEstimate;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenNewLabel(area) {
    console.log("TriggerWhenNewLabel called ", area._id);
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const gmail = google.gmail({ version: "v1", auth: client });
      const res = await gmail.users.labels.list({
        userId: "me",
      });
      if (res.data.labels.length > area.user.google.labelCounter) {
        console.log("found a new label");
        await processReaction(area);
      }
      area.user.google.labelCounter = res.data.labels.length;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenNewStarredMail(area) {
    console.log("TriggerWhenNewStarredMail called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const gmail = google.gmail({ version: "v1", auth: client });
      const res = await gmail.users.messages.list({
        userId: "me",
        q: "is:starred",
      });
      if (res.data.resultSizeEstimate > area.user.google.starredMailCounter) {
        console.log("found a new starred mail");
        await processReaction(area);
      }
      area.user.google.starredMailCounter = res.data.resultSizeEstimate;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenNewAttachment(area) {
    console.log("TriggerWhenNewAttachment called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const gmail = google.gmail({ version: "v1", auth: client });
      const res = await gmail.users.messages.list({
        userId: "me",
        q: "has:attachment",
      });
      if (res.data.resultSizeEstimate > area.user.google.attachmentCounter) {
        console.log("found a new attachment");
        await processReaction(area);
      }
      area.user.google.attachmentCounter = res.data.resultSizeEstimate;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenNewEmailMatchingSearch(area) {
    console.log("TriggerWhenNewEmailMatchingSearch called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const gmail = google.gmail({ version: "v1", auth: client });
      const res = await gmail.users.messages.list({
        userId: "me",
        q: "is:unread " + area.action.args.search,
      });
      if (res.data.resultSizeEstimate > 0) {
        console.log("found a new mail matching search");
        await processReaction(area);
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenNewThread(area) {
    console.log("TriggerWhenNewThread called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const gmail = google.gmail({ version: "v1", auth: client });
      const res = await gmail.users.threads.list({
        userId: "me",
        q: "is:unread",
      });
      if (res.data.resultSizeEstimate > area.user.google.threadCounter) {
        console.log("found a new thread");
        await processReaction(area);
      }
      area.user.google.threadCounter = res.data.resultSizeEstimate;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenNewDraft(area) {
    console.log("TriggerWhenNewDraft called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const gmail = google.gmail({ version: "v1", auth: client });
      const drafts = await gmail.users.drafts.list({
        userId: "me",
      });
      if (drafts.data.resultSizeEstimate > area.user.google.draftsCounter) {
        console.log("found a new drafts");
        await processReaction(area);
      }
      area.user.google.draftsCounter = drafts.data.resultSizeEstimate;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  // calendar triggers
  static async TriggerWhenNewCalendarEvent(area) {
    console.log("TriggerWhenNewCalendarEvent called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const calendar = google.calendar({ version: "v3", auth: client });
      const events = await calendar.events.list({
        calendarId: "primary",
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      });
      if (events.data.items.length > area.user.google.eventsCounter) {
        console.log("found a new events");
        await processReaction(area);
      }
      area.user.google.eventsCounter = events.data.items.length;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenNewCalendar(area) {
    console.log("TriggerWhenNewCalendar called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const calendar = google.calendar({ version: "v3", auth: client });
      const calendars = await calendar.calendarList.list();
      if (calendars.data.items.length > area.user.google.calendarsCounter) {
        console.log("found a new calendars");
        await processReaction(area);
      }
      area.user.google.calendarsCounter = calendars.data.items.length;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenEventCanceled(area) {
    console.log("TriggerWhenEventCanceled called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const calendar = google.calendar({ version: "v3", auth: client });
      const events = await calendar.events.list({
        calendarId: "primary",
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      });
      if (events.data.items.length < area.user.google.eventsCounter) {
        console.log("delete a events");
        await processReaction(area);
      }
      area.user.google.eventsCounter = events.data.items.length;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenEventEnded(area) {
    console.log("TriggerWhenEventEnded called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const calendar = google.calendar({ version: "v3", auth: client });
      const events = await calendar.events.list({
        calendarId: "primary",
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      });
      const now = new Date();
      var endedEvent = 0;
      for (const event of events.data.items) {
        var time = new Date(event.end.dateTime);
        if (Date.parse(time) < Date.parse(now)) {
          endedEvent++;
        }
      }
      if (endedEvent > area.user.google.endedEventsCounter) {
        console.log("ended a events");
        await processReaction(area);
      }
      area.user.google.endedEventsCounter = endedEvent;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenEventStarted(area) {
    console.log("TriggerWhenEventStarted called");
    try {
      var TimeBeforeEvent = area.action.args.timeBeforeEvent;
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const calendar = google.calendar({ version: "v3", auth: client });
      const events = await calendar.events.list({
        calendarId: "primary",
        maxResults: 10,
        singleEvents: true,
        timeMin: new Date().toISOString(),
        orderBy: "startTime",
      });
      const now = new Date();
      for (const event of events.data.items) {
        var time = new Date(event.start.dateTime);
        if (Date.parse(time) - Date.parse(now) < TimeBeforeEvent * 60000) {
          console.log("started a events");
          await processReaction(area);
          schedule.scheduledJobs[area._id]?.cancel();
          await area.user.areas.pull(area._id);
          await area.user.save();
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  // contacts triggers

  static async TriggerWhenNewContact(area) {
    console.log("TriggerWhenNewContact called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const people = google.people({ version: "v1", auth: client });
      const res = await people.people.connections.list({
        resourceName: "people/me",
        personFields: "names,emailAddresses",
      });
      if (res.data.totalPeople > area.user.google.contactCounter) {
        console.log("found a new contact");
        await processReaction(area);
      }
      area.user.google.contactCounter = res.data.totalPeople
        ? res.data.totalPeople
        : 0;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenContactDeleted(area) {
    console.log("TriggerWhenContactDeleted called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const people = google.people({ version: "v1", auth: client });
      const res = await people.people.connections.list({
        resourceName: "people/me",
        personFields: "names,emailAddresses",
      });
      if (res.data.totalPeople < area.user.google.contactCounter) {
        console.log("delete a contact");
        await processReaction(area);
      }
      area.user.google.contactCounter = res.data.totalPeople
        ? res.data.totalPeople
        : 0;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenNewContactLabel(area) {
    console.log("TriggerWhenNewContactLabel called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const people = google.people({ version: "v1", auth: client });
      const res = await people.contactGroups.list();
      if (res.data.contactGroups.length > area.user.google.groupCounter) {
        console.log("found a new contact label");
        await processReaction(area);
      }
      area.user.google.groupCounter = res.data.contactGroups.length;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  // google docs triggers
  static async TriggerWhenNewDoc(area) {
    console.log("TriggerWhenNewDoc called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const drive = google.drive({ version: "v3", auth: client });
      const res = await drive.files.list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name)",
      });
      if (res.data.files.length > area.user.google.docsCounter) {
        console.log("found a new doc");
        await processReaction(area);
      }
      area.user.google.docsCounter = res.data.files.length;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async TriggerWhenDocDeleted(area) {
    console.log("TriggerWhenDocDeleted called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const drive = google.drive({ version: "v3", auth: client });
      const res = await drive.files.list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name)",
      });
      if (res.data.files.length < area.user.google.docsCounter) {
        console.log("delete a doc");
        await processReaction(area);
      }
      area.user.google.docsCounter = res.data.files.length;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }

  //Google Tasks
  static async TriggerWhenNewTask(area) {
    console.log("TriggerWhenNewTask called");
    try {
      client.setCredentials({
        refresh_token: area.user.google.refreshToken,
      });
      const tasks = google.tasks({ version: "v1", auth: client });
      const res = await tasks.tasks.list({
        tasklist: "@default",
      });
      if (res.data.items.length > area.user.google.tasksCounter) {
        console.log("found a new task");
        await processReaction(area);
      }
      area.user.google.tasksCounter = res.data.items.length;
      await area.user.save();
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Google;
