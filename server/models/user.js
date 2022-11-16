const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    google: {
      refreshToken: { type: String, required: false },
      //gmail
      mailCounter: { type: Number, required: false },
      labelCounter: { type: Number, required: false },
      draftCounter: { type: Number, required: false },
      starredMailCounter: { type: Number, required: false },
      attachmentCounter: { type: Number, required: false },
      threadCounter: { type: Number, required: false },
      //calendar
      eventsCounter: { type: Number, required: false },
      calendarsCounter: { type: Number, required: false },
      endedEventsCounter: { type: Number, required: false },
      //contacts
      contactCounter: { type: Number, required: false },
      groupCounter: { type: Number, required: false },
      // docs
      docsCounter: { type: Number, required: false },
      // tasks
      tasksCounter: { type: Number, required: false },
    },
    discord: {
      refreshToken: { type: String, required: false },
      username: { type: String, required: false },
      discriminator: { type: String, required: false },
      full_username: { type: String, required: false },
    },
    twitter: {
      refreshToken: { type: String, required: false },
    },
    microsoft: {
      refreshToken: { type: String, required: false },
    },
    facebook: {
      refreshToken: { type: String, required: false },
      username: { type: String, required: false },
    },
    areas: [
      {
        action: { type: String, required: true },
        reaction: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
