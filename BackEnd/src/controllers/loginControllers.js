const { where } = require("sequelize");
const { user, dataUser, role } = require("../database/models/index");
const { refreshAccessToken, auth, validatePassword, hashPassword } = require('@services/auth');

const forgotPasswordStore = new Map();
const FORGOT_PASSWORD_EXPIRATION_MS = 15 * 60 * 1000; // 15 minutos

async function sendEmailToService({name, apell1, apell2, email, subject, mensaje, Instituto}) {
  const serviceUrl = process.env.SERVICE_MAIL_URL || "http://localhost:4321";
  const res = await fetch(`${serviceUrl}/sendemail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.APIKEYHASH_APP || "",
    },
    body: JSON.stringify({ name, apell1, apell2, email, subject, mensaje, Instituto }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    const err = new Error(errText || `Mail service responded ${res.status}`);
    throw err;
  }

  return true;
}

const login = async (req, res) => {
  try {
    const { userName, pass } = req.body;
    const resp = await user.findOne({
      where: { userName },
      attributes: ["id", "roleid", "email", "pass"],
      include: [{
        model: dataUser,
        attributes: { exclude: ["id", "userId", "createdAt", "updatedAt"] },
        as: "datosPersonales"
      }],
      raw: true,
      nest: true
    });

    if (!resp) {
      return res.status(404).json({ error: 'Usuario o Contraseña incorrecto.' });
    }

    const hashedPassword = resp?.pass;
    if (!hashedPassword) {
      return res.status(400).json({ error: 'Usuario o Contraseña incorrecto.' });
    }

    const isPasswordValid = await validatePassword(pass, hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = await auth({ id: resp.id, roleId: resp.roleid });
    return res.status(200).json({
      id: resp.id,
      userName: resp.userName,
      roleId: resp.roleid,
      email: resp.email,
      datosPersonales: resp.datosPersonales,
      token: token
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "No fue posible obtener la información",
      success: false
    });
  }
};

const register = async (req, res) => {
  try {
    const requestData = req.body;
    const role = requestData.rol;

    if (!role && role !== 'guest') {
      return res.status(401).json({ error: 'No tiene permiso para registrarse' });
    }

    const newUserPayload = {
      userName: requestData.userName,
      pass: await hashPassword(requestData.pass),
      email: requestData.email,
      active: false
    };

    const createdUser = await user.create(newUserPayload);

    if (requestData.datosPersonales) {
      await dataUser.create({
        ...requestData.datosPersonales,
        userId: createdUser.id,
      });
    }

    const userResult = await user.findOne({
      where: { id: createdUser.id },
      attributes: { exclude: ['pass', 'createdAt', 'updatedAt'] },
      include: [{
        model: dataUser,
        as: 'datosPersonales',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }],
    });

    res.status(200).json({
      message: 'En las siguientes 24 horas se enviara un correo para la activacion de su cuenta',
      success: true,
      result: userResult,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      message: 'No fue posible registrar el usuario',
      success: false,
      error,
    });
  }
};

const forgotPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email es requerido' });

    const existingUser = await user.findOne({ where: { email } });
    if (!existingUser) return res.status(404).json({ error: 'Email no encontrado' });

    const rawName = existingUser.userName || '';
    const parts = rawName.split(' ');
    const name = parts[0] || '';
    const apell1 = parts[1] || '';
    const apell2 = parts.slice(2).join(' ') || '';

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await sendEmailToService({
      name,
      apell1,
      apell2,
      email,
      subject: 'Código de verificación',
      mensaje: `Tu código de verificación es ${code}`,
      Instituto: 'MATRICOOL',
    });

    const expiresAt = Date.now() + FORGOT_PASSWORD_EXPIRATION_MS;
    forgotPasswordStore.set(email, { code, expiresAt, verified: false });

    setTimeout(() => {
      const entry = forgotPasswordStore.get(email);
      if (entry && entry.expiresAt <= Date.now()) {
        forgotPasswordStore.delete(email);
      }
    }, FORGOT_PASSWORD_EXPIRATION_MS);

    return res.status(200).json({ success: true, message: 'Código enviado al correo' });
  } catch (error) {
    console.error('forgotPasswordRequest error', error);
    return res.status(500).json({ error: 'No se pudo enviar código de verificación' });
  }
};

const verifyForgotPasswordCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: 'Email y código son requeridos' });

    const entry = forgotPasswordStore.get(email);
    if (!entry) return res.status(404).json({ error: 'No existe solicitud de restauración' });

    if (entry.expiresAt < Date.now()) {
      forgotPasswordStore.delete(email);
      return res.status(410).json({ error: 'Código expirado' });
    }

    if (entry.code !== String(code)) return res.status(401).json({ error: 'Código inválido' });

    entry.verified = true;
    forgotPasswordStore.set(email, entry);

    return res.status(200).json({ success: true, message: 'Código verificado' });
  } catch (error) {
    console.error('verifyForgotPasswordCode error', error);
    return res.status(500).json({ error: 'Error verificando código' });
  }
};

const resetForgotPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;
    if (!email || !code || !password) return res.status(400).json({ error: 'Email, código y contraseña son requeridos' });

    const entry = forgotPasswordStore.get(email);
    if (!entry) return res.status(404).json({ error: 'No existe solicitud de restauración' });

    if (entry.expiresAt < Date.now()) {
      forgotPasswordStore.delete(email);
      return res.status(410).json({ error: 'Código expirado' });
    }

    if (entry.code !== String(code) || !entry.verified) {
      return res.status(401).json({ error: 'Código inválido o no verificado' });
    }

    const existingUser = await user.findOne({ where: { email } });
    if (!existingUser) return res.status(404).json({ error: 'Email no encontrado' });

    const hashed = await hashPassword(password);
    await user.update({ pass: hashed }, { where: { id: existingUser.id } });

    forgotPasswordStore.delete(email);

    return res.status(200).json({ success: true, message: 'Contraseña actualizada' });
  } catch (error) {
    console.error('resetForgotPassword error', error);
    return res.status(500).json({ error: 'Error actualizando contraseña' });
  }
};

const forgotPass = async (req, res) => {
  let user = req.body;
  let role = user.rol;
  let { id } = user
  let { roleId, active } = req?.body;
  if (roleId || active) {
    delete user.roleId;
    delete user.active;
  }
  if (role || role === 'guest') {
    user.pass = await hashPassword(user.pass);
    let result = await user.update(user, { where: { id } });
    res.status(200).json({
      message: "Contraseña actualizada correctamente",
      success: true,
      result: result
    });
  } else {
    res.status(401).json({ error: 'No tiene permiso para esta accion' });
  }
}

const activateAccount = async (req, res) => {
  console.log("Activar cuenta", req.body);
  let user = req.body;
  let { id, rol, roleId } = user;
  if (roleId) {
    delete user.roleId;
  }
  if (rol || rol === 'guest') {
    let result = await user.update(user, { where: { id } });
    res.status(200).json({
      message: "cuenta activada correctamente",
      success: true,
      result: result
    });
    console.log()
  } else {

    res.status(401).json({ error: 'No tiene permiso para esta accion' });
  }
}

const generateToken = async (req, res) => {
  const { Token } = req.body;
  const accessToken = generateToken(Token);

  res.json({ accessToken: accessToken });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  const newAccessToken = refreshAccessToken(refreshToken);

  if (!newAccessToken) {
    return res.status(401).json({ error: 'Refresh token inválido o expirado' });
  }

  res.json({ accessToken: newAccessToken });
};

module.exports = {
  login,
  register,
  refreshToken,
  generateToken,
  forgotPass,
  activateAccount,
  forgotPasswordRequest,
  verifyForgotPasswordCode,
  resetForgotPassword,
};
