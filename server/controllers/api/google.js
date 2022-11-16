const User = require("../../models/user");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

async function loginMobile(req, res) {
  try {
    const accessToken = req.body.accessToken;
    const profile = await client.getTokenInfo(accessToken);
    var user = await User.findOne({ email: profile.email });
    if (!user) {
      user = await User.create({
        email: profile.email,
      });
      console.log("user created");
    }
    res.status(200).json({
      message: "Authentification réussie",
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      }),
    });
  } catch (error) {
    res.status(400).json({ message: "Authentification échouée" });
  }
}

async function login(req, res) {
  try {
    if (!req.body.code) {
      return loginMobile(req, res);
    }
    const tokens = await client.getToken(req.body.code);
    const refreshToken = tokens.tokens.refresh_token;
    var profile = client.verifyIdToken({
      idToken: tokens.tokens.id_token,
    });
    profile = await profile;
    profile = profile.payload;
    var user = await User.findOne({ email: profile.email });
    if (!user) {
      user = new User({
        email: profile.email,
        google: { refreshToken },
      });
      await user.save();
      console.log("user created");
    }
    user.google.refreshToken = refreshToken;
    await user.save();
    console.log("Connected to google");
    return res.status(200).json({
      message: "Authentification réussie",
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      }),
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  login,
};
