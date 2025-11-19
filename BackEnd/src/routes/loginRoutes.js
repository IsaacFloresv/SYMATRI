const express = require("express");
const router = express.Router();

const {login, register, forgotPass, activateAccount} = require("../controllers/loginControllers");

router.get("/", (req, res) => {
  res.json({ login: "aqui" });
});

router.post("/login", login);
router.post("/register", register);
router.patch("/forgotPass", forgotPass);
router.patch("/activateAccount", activateAccount);
module.exports = router;
