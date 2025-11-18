const express = require("express");
const router = express.Router();

const {login, register, forgotPass} = require("../controllers/loginControllers");

router.get("/", (req, res) => {
  res.json({ login: "aqui" });
});

router.post("/login", login);
router.post("/register", register);
router.patch("/forgotPass", forgotPass);
module.exports = router;
