const { default: axios } = require("axios");
const sendTweet = require("../../utils/sendTweet");
const { URLSearchParams } = require("url");

class Twitter {
  static async SendTweet(area) {
    console.log("SendTweet reaction called");
    const data = new URLSearchParams();
    data.append("client_id", process.env.CLIENT_ID_TWITTER);
    data.append("grant_type", "refresh_token");
    data.append("refresh_token", area.user.twitter.refreshToken);
    data.append("client_secret", process.env.CLIENT_SECRET_TWITTER);
    data.append("redirect_uri", process.env.TWITTER_REDIRECT_URI);

    let response = null;
    try {
      response = await axios.post(
        "https://api.twitter.com/2/oauth2/token",
        data.toString(),
        {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        }
      );
    } catch (error) {
      console.log("error");
      console.log(error.response.data);
      return null;
    }
    const accesToken = response.data.access_token;
    area.user.twitter.refreshToken = response.data.refresh_token;
    await area.user.save();
    await sendTweet(accesToken, area.reaction.args.tweetMsg);
  }
}

module.exports = Twitter;
