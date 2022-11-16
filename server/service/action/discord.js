const axios = require("axios");
const processReaction = require("../reactionService");

class Discord {
  static async TriggerWhenNameUpdated(area) {
    let user = area.user;
    if (!user.discord.refreshToken) {
      return;
    }
    try {
      const data = new URLSearchParams();
      data.append("client_id", process.env.DISCORD_CLIENT_ID);
      data.append("client_secret", process.env.DISCORD_CLIENT_SECRET);
      data.append("grant_type", "refresh_token");
      data.append("refresh_token", user.discord.refreshToken);
      let access_token = await axios.post(
        "https://discord.com/api/v10/oauth2/token",
        data
      );
      let response = await axios.get("https://discord.com/api/v10/users/@me", {
        headers: { authorization: `Bearer ${access_token.data.access_token}` },
      });
      if (!user.discord.username) {
        user.discord.username = response.data.username;
        user.discord.discriminator = "#" + response.data.discriminator;
        user.discord.full_username =
          response.data.username + "#" + response.data.discriminator;
        if (access_token.data.refresh_token) {
          user.discord.refreshToken = access_token.data.refresh_token;
        }
        await user.save();
        return;
      }
      if (access_token.data.refresh_token) {
        user.discord.refreshToken = access_token.data.refresh_token;
        await user.save();
      }

      const hasSameName = response.data.username === user.discord.username;

      if (!hasSameName) {
        user.discord.username = response.data.username;
        user.discord.discriminator = "#" + response.data.discriminator;
        user.discord.full_username =
          response.data.username + "#" + response.data.discriminator;
        await user.save();
        await processReaction(area);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}

module.exports = Discord;
