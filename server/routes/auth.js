const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

router.post("/auth/register", authCtrl.register);
router.post("/auth/login", authCtrl.login);
router.post("/auth/forgotpassword", authCtrl.forgotPassword);
router.put("/auth/passwordreset/:resetToken", authCtrl.resetPassword);
router.get("/auth/confirmregister/:confirmToken", authCtrl.confirmRegister);
router.post("/auth/refreshToken", authCtrl.deleteRefreshToken);
router.get("/users", authCtrl.users);
router.get("/users/:id", authCtrl.usersId);
router.delete("/users/:id", authCtrl.deleteUser);

module.exports = router;
