const { default: axios } = require("axios")
const { URLSearchParams } = require("url");
const msal = require("@azure/msal-node");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  if (!req.body.code) return res.status(400).json({ error: "NoCodeProvided" });
  let response
  try {
    let data = new URLSearchParams();
    data.append("client_id", process.env.MICROSOFT_CLIENT_ID);
    data.append("redirect_uri", process.env.MICROSOFT_REDIRECT_URI);
    data.append("grant_type", "authorization_code");
    data.append("code", req.body.code);
    data.append("client_secret", process.env.MICROSOFT_CLIENT_SECRET);
    data.append("authority", process.env.MICROSOFT_AUTHORITY);

    response = await axios.post(
      "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      data
    );
  } catch (error) {
    console.log(error.response.data)
  }
  const refreshToken = response.data.refresh_token;
  const accessToken = response.data.access_token;

  let microsoftDetails
  try {
    microsoftDetails = await axios.get("https://graph.microsoft.com/v1.0/me", {
      headers: { authorization: `Bearer ${accessToken}` },
    })
  } catch (e) {
    console.log(e.response.data)
  }
  let user
  if (req.body.email)
    user = await User.findOne({ email: req.body.email });
  else
    user = await User.findOne({ email: microsoftDetails.data.mail });
  if (!user) {
    user = new User({
      email: microsoftDetails.data.mail,
      microsoft: { refreshToken }
    });
    await user.save();
  }
  user.microsoft.refreshToken = refreshToken;
  await user.save();
  return req.body.email ? res.status(200).json({
    message: "Authentification réussie",
  }) : res.status(200).json({
    message: "Authentification réussie",
    accessToken: accessToken,
    token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }),
  });
}

module.exports = {
  login,
};
