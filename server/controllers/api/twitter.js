const { default: axios } = require("axios");
const { URLSearchParams } = require("url");
const User = require("../../models/user");

async function login(req, res) {
  if (!req.body.email)
    return res.status(400).json({ error: "NoEmailProvided" });
  if (!req.body.code) return res.status(400).json({ error: "NoCodeProvided" });
  const data = new URLSearchParams();
  data.append("client_id", process.env.CLIENT_ID_TWITTER);
  data.append("grant_type", "authorization_code");
  data.append("code", req.body.code);
  data.append("redirect_uri", process.env.TWITTER_REDIRECT_URI);
  data.append("code_verifier", "challenge");
  let response;
  try {
    response = await axios.post("https://api.twitter.com/2/oauth2/token", data);
  } catch (error) {
    return res.status(400).json(error.response.data);
  }
  const refreshToken = response.data.refresh_token;
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    user.twitter.refreshToken = refreshToken;
    await user.save();
  } else {
    return res.status(400).json({ error: "NoUserWithThisEmail" });
  }
  return res.status(200).json({
    message: "Authentification réussie",
  });
}

module.exports = {
  login,
};
