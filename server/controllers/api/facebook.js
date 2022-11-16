const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { default: axios } = require("axios");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  if (!req.body.code) return res.status(400).json({ error: "NoCodeProvided" });
  let response;
  try {
    response = await axios.get(
      `https://graph.facebook.com/v15.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${req.body.code}`
    );
  } catch (error) {
    return res.status(400).json({ error: "InvalidCodeProvided" });
  }
  const accessToken = response.data.access_token;
  const refreshToken = await fetch(
    `https://graph.facebook.com/v15.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&fb_exchange_token=${accessToken}`
  )
    .then((res) => res.json())
    .then((json) => json.access_token);

  let user_info = await axios.get(
    `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
  );
  let user = await User.findOne({ email: user_info.data.email });
  if (!user) {
    user = new User({
      email: user_info.data.email,
      facebook: { refreshToken },
    });
    await user.save();
    console.log("user created");
  }
  user.facebook.refreshToken = refreshToken;
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
