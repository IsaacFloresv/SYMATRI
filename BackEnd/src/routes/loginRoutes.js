const express = require("express");
const router = express.Router();

const { login, register, forgotPass, activateAccount, forgotPasswordRequest, verifyForgotPasswordCode, resetForgotPassword } = require("../controllers/loginControllers");

router.get("/", (req, res) => {
  res.json({ login: "aqui" });
});

router.post("/login", login);
router.post("/register", register);
router.post("/forgot-password", forgotPasswordRequest);
router.post("/forgot-password/verify", verifyForgotPasswordCode);
router.put("/forgot-password/reset", resetForgotPassword);
router.patch("/forgotPass", forgotPass);
router.patch("/activateAccount", activateAccount);
module.exports = router;
