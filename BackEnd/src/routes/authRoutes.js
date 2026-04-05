const express = require("express");
const {
  requestOtpController,
  verifyOtpController,
  defineForgotPassword,
} = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ auth: "aqui" });
});

router.post("/request-otp", requestOtpController);
router.post("/verify-otp", verifyOtpController);
router.put("/definePass", defineForgotPassword);
module.exports = router;
