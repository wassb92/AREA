const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { default: axios } = require("axios");
const { URLSearchParams } = require("url");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  if (!req.body.code) return res.status(400).json({ error: "NoCodeProvided" });
  const data = new URLSearchParams();
  data.append("client_id", process.env.DISCORD_CLIENT_ID);
  data.append("client_secret", process.env.DISCORD_CLIENT_SECRET);
  data.append("grant_type", "authorization_code");
  data.append("code", req.body.code);
  data.append("redirect_uri", process.env.DISCORD_REDIRECT_URI);
  let response;
  try {
    response = await axios.post(
      "https://discord.com/api/v10/oauth2/token",
      data
    );
  } catch (error) {
    return res.status(400).json({ error: "InvalidCodeProvided" });
  }
  const accessToken = response.data.access_token;
  const refreshToken = response.data.refresh_token;
  const token_type = response.data.token_type;
  let user_info = await axios.get("https://discord.com/api/v10/users/@me", {
    headers: { authorization: `${token_type} ${accessToken}` },
  });
  let user = await User.findOne({ email: user_info.data.email });
  if (!user) {
    user = new User({
      email: user_info.data.email,
      discord: { refreshToken },
    });
    await user.save();
    console.log("user created");
  }
  user.discord.refreshToken = refreshToken;
  await user.save();

  return res.status(200).json({
    message: "Authentification réussie",
    token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }),
  });
}

module.exports = {
  login,
};
