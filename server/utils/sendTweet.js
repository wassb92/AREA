const { default: axios } = require("axios");

const sendTweet = async (accessToken, tweetMsg) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
  const data = {
    text: tweetMsg,
  };
  try {
    await axios.post("https://api.twitter.com/2/tweets", data, config);
    console.log("tweetSended");
  } catch (error) {
    console.log(error.response.data);
  }
};

module.exports = sendTweet;
