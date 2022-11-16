const axios = require("axios");
const processReaction = require("../reactionService");
const Jimp = require("jimp");

class Facebook {
  static bitmapData = null;
  static async TriggerWhenProfilePictureUpdated(area) {
    let user = area.user;
    try {
      let access_token = await axios.get(
        `https://graph.facebook.com/v15.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&grant_type=fb_exchange_token&fb_exchange_token=${user.facebook.refreshToken}`
      );

      const { data } = await axios.get(
        "https://graph.facebook.com/v15.0/me?fields=picture&access_token=" +
          access_token.data.access_token
      );
      const profilePicture = data.picture.data.url;
      const image = new Jimp(profilePicture, function (err, image) {
        if (err) {
          console.log("error", err);
          throw err;
        }
        image.bitmap.data = JSON.stringify(image.bitmap.data);
        if (Facebook.bitmapData === null) {
          Facebook.bitmapData = image.bitmap.data;
        } else if (Facebook.bitmapData !== image.bitmap.data) {
          Facebook.bitmapData = image.bitmap.data;
          processReaction(area);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async TriggerWhenNameUpdated(area) {
    let user = area.user;
    if (!user.facebook.refreshToken) {
      return;
    }
    try {
      let access_token = await axios.get(
        `https://graph.facebook.com/v10.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&grant_type=fb_exchange_token&fb_exchange_token=${user.facebook.refreshToken}`
      );
      let response = await axios.get(
        `https://graph.facebook.com/v10.0/me?fields=id,name&access_token=${access_token.data.access_token}`
      );
      if (!user.facebook.username) {
        user.facebook.username = response.data.name;
        if (access_token.data.refresh_token) {
          user.facebook.refreshToken = access_token.data.refresh_token;
        }
        await user.save();
        return;
      }
      if (access_token.data.refresh_token) {
        user.facebook.refreshToken = access_token.data.refresh_token;
        await user.save();
      }

      const hasSameName = response.data.name === user.facebook.username;

      if (!hasSameName) {
        user.facebook.username = response.data.name;
        await user.save();
        await processReaction(area);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}

module.exports = Facebook;
