// src/controllers/authController.js
const {
  generateOtp,
  saveOtp,
  verifyOtp,
  OTP_TTL_MS,
} = require("../services/otpService");
const { user } = require("../database/models/index");
const { hashPassword } = require("@services/auth");
const {getByEmail} = require("./usersControllers");
const { getNameInstituto } = require("./configControllers");
const config = require("@config/config")

async function requestOtpController(req, res) {
  try {
    const { email } = req.body;
    const dataUser = await getByEmail(email);
    let user = dataUser || {};
    console.log("primer paso", { email, user });
    if (!dataUser) {
      return res.status(404).json({ message: "Email no encontrado" });
    }

    const {
      userId,
      name,
      lastName,
    } = dataUser;

    const Instituto = await getNameInstituto();

    
console.log("segundo paso", { userId, name, lastName, Instituto });

    if (!userId || !email) {
      return res.status(400).json({ message: "userId y email son obligatorios" });
    }

    // 1. Generar OTP
    const otp = generateOtp();

    // 2. Guardar OTP hasheado
    await saveOtp(userId, otp, OTP_TTL_MS);

    // 3. Construir subject y mensaje
    const subject = "Restablecimiento de contraseña – Código de verificación";

    const mensaje = `
Hola ${name || ""} ${lastName || ""} del Instituto ${Instituto || ""},

Tu código de verificación para restablecer tu contraseña es:

${otp}

Este código expira en 5 minutos.
`.trim();

    // 4. Enviar correo REAL usando fetch
    const emailServiceUrl = "http://localhost:3050/sendemail";

    const response = await fetch(emailServiceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.apiKeyHashApp || "",
      },
      body: JSON.stringify({
        name,
        lastName,
        email,
        mensaje,
        subject,
        Instituto,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servicio de correo:", errorText);
      return res.status(500).json({ message: "Error al enviar el correo" });
    }

    return res.json({ message: "OTP enviado al correo" });
  } catch (error) {
    console.error("Error al solicitar OTP:", error.message);
    return res.status(500).json({ message: "Error interno al enviar OTP" });
  }
}

async function verifyOtpController(req, res) {
  const { userId, otp } = req.body;
  console.log("Inicamosdo verifyOtpController", { userId, otp });
  if (!userId || !otp) {
    return res.status(400).json({ valid: false, message: "userId y otp son obligatorios" });
  }

  const isValid = await verifyOtp(userId, otp);

  if (!isValid) {
    return res.status(400).json({ valid: false, message: "OTP inválido o expirado" });
  }

  return res.json({ valid: true, message: "OTP válido" });
}

const defineForgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email y contraseña son requeridos' });

    const existingUser = await user.findOne({ where: { email } });
    if (!existingUser) return res.status(404).json({ error: 'Email no encontrado' });

    const hashed = await hashPassword(password);
    await user.update({ pass: hashed }, { where: { id: existingUser.id } });

    return res.status(200).json({ success: true, message: 'Contraseña actualizada' });
  } catch (error) {
    console.error('resetForgotPassword error', error);
    return res.status(500).json({ error: 'Error actualizando contraseña' });
  }
};

module.exports = {
  requestOtpController,
  verifyOtpController,
  defineForgotPassword,
};
