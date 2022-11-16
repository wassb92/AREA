const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config({ path: "./config.env" });

exports.register = async function (req, res) {
  const { email, password } = req.body;

  try {
    const confirmToken = jwt.sign(
      { email: email, password: password },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    const confirmUrl = `http://localhost:${
      process.env.WEBPORT || "8081"
    }/confirmation/${confirmToken}`;
    const message = `
    <!DOCTYPE html>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
@media screen {
@font-face {
font-family: 'Lato';
font-style: normal;
font-weight: 400;
src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
}
@font-face {
font-family: 'Lato';
font-style: normal;
font-weight: 700;
src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
}
@font-face {
font-family: 'Lato';
font-style: italic;
font-weight: 400;
src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
}
@font-face {
font-family: 'Lato';
font-style: italic;
font-weight: 700;
src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
}
}
/* CLIENT-SPECIFIC STYLES */
body,
table,
td,
a {
-webkit-text-size-adjust: 100%;
-ms-text-size-adjust: 100%;
}
table,
td {
mso-table-lspace: 0pt;
mso-table-rspace: 0pt;
}
img {
-ms-interpolation-mode: bicubic;
}
/* RESET STYLES */
img {
border: 0;
height: auto;
line-height: 100%;
outline: none;
text-decoration: none;
}
table {
border-collapse: collapse !important;
}
body {
height: 100% !important;
margin: 0 !important;
padding: 0 !important;
width: 100% !important;
}
/* iOS BLUE LINKS */
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important;
}
/* MOBILE STYLES */
@media screen and (max-width:600px) {
h1 {
font-size: 32px !important;
line-height: 32px !important;
}
}
/* ANDROID CENTER FIX */
div[style*="margin: 16px 0;"] {
margin: 0 !important;
}
</style>
</head>
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> Nous sommes ravis de vous avoir ici! Préparez-vous à plonger dans votre nouveau compte. </div>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<!-- LOGO -->
<tr>
<td bgcolor="#6b21a8" align="center">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
<tr>
<td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
 </tr>
</table>
</td>
</tr>
<tr>
<td bgcolor="#6b21a8" align="center" style="padding: 0px 10px 0px 10px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
<tr>
<td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
<h1 style="font-size: 48px; font-weight: 400; margin: 2;">Bienvenue !</h1> <img src="https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
<tr>
<td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
<p style="margin: 0;">Nous sommes ravis de vous voir. Tout d'abord, vous devez confirmer votre compte. Appuyez simplement sur le bouton ci-dessous.</p>
</td>
</tr>
<tr>
<td bgcolor="#ffffff" align="left">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
<table border="0" cellspacing="0" cellpadding="0">
<tr>
<td align="center" style="border-radius: 40px;" bgcolor="#6b21a8"><a href=${confirmUrl} target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 50px; border: 1px solid #6b21a8; display: inline-block;">Confirmer mon compte</a></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr> <!-- COPY -->
<tr>
<td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
<p style="margin: 0;">Si cela ne fonctionne pas, copiez et collez le lien suivant dans votre navigateur :</p>
</td>
</tr> <!-- COPY -->
<tr>
 <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
<p style="margin: 0;"><a href=${confirmUrl} target="_blank" style="color: #6b21a8;">${confirmUrl}</a></p>
</td>
</tr>
<tr>
<td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
<p style="margin: 0;">Si vous avez des questions, vous pouvez nous envoyer un mail à area.catt@gmail.com. Nous serons toujours ravis de vous aider.</p>
</td>
</tr>
<tr>
<td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
<p style="margin: 0;">Merci,<br>AREA CATT Team</p>
</td>
</tr>
</table>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`;
    try {
      await sendEmail({
        to: email,
        subject: "Confirmation d'inscription",
        text: message,
      });
      res.status(200).json({
        success: true,
        data: "Un email de confirmation vous a été envoyé",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "L'email n'a pas pu être envoyé" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Serveur Error" });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Veuillez remplir tous les champs" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    res.status(200).json({
      message: "Authentification réussie",
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      }),
    });
  } catch (err) {
    res.status(500).json({ error: "login faild" });
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:${
      process.env.WEBPORT || "8081"
    }/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>Vous avez demandé à réinitialiser votre mot de passe</h1>
      <p>Pour se faire merci de cliquer sur le lien suivant :</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Réinitialisation du mot de passe",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email envoyé" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "L'email n'a pas pu être envoyé" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.resetPassword = async (req, res, next) => {
  const decodedToken = jwt.verify(
    req.params.resetToken,
    process.env.JWT_SECRET
  );
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    return new ErrorResponse("Utilisateur non trouvé", 404);
  }
  const hash = await bcrypt.hash(req.body.password, 10);
  user.password = hash;
  await user.save();
  res.status(200).json({ success: true, data: "Mot de passe mis à jour" });
};

exports.confirmRegister = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(
      req.params.confirmToken,
      process.env.JWT_SECRET
    );
    const password = bcrypt.hashSync(decodedToken.password, 10);
    await User.create({
      email: decodedToken.email,
      password: password,
    });
    res.status(200).json({ success: true, data: "Succès de l'inscription" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server: échec de l'enregistrement" });
  }
};

exports.deleteRefreshToken = async (req, res, next) => {
  const { user } = req.body;
  const { service } = req.body;
  const userId = user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }
    user[service] = undefined;
    await user.save();
    res.status(200).json({ success: true, data: "Token supprimé" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.users = async function (req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.usersId = async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteUser = async function (req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
