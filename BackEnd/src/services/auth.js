require('module-alias/register');
const { roles } = require("../database/models/index");
const { jwtSecret } = require('@config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const auth = async (param) => {
  const { id, roleId } = param;

  const token = jwt.sign(
    { id: id, roleId: roleId },   // payload
    jwtSecret,                  // clave secreta
    { expiresIn: '4h' }         // duración del token
  );

  return token;
};

// 🔐 Cifrar contraseña
const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  let res = await bcrypt.hash(plainPassword, salt);
  return res;
};

// 🔍 Validar contraseña
const validatePassword = async (plainPassword, hashedPassword) => {
  let res = await bcrypt.compare(plainPassword, hashedPassword);
  return res;
};

// 🕵️‍♂️ Decodificar token
const decodedToken = async (token) => {
  let res = jwt.decode(token);
  return res;
}

// ✅ Verificar token
const verifierToken = async (token) => {
  try {
    if (!token) {
      return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, jwtSecret);
    let id = decoded.roleId;
    decoded.role = await getNameRole(id);
    return decoded;
  } catch (err) {
    return err;
  }
};

const getNameRole = async (id) => {
  const role = await roles.findOne({
      where: { id: id },
      attributes: ["nombre"],
      raw: true,
      nest: true
    });
  return role.nombre;
}

// 🔄 Refrescar token de acceso
const refreshAccessToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id, rol: decoded.rol },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
    );
    return newAccessToken;
  } catch (err) {
    return err;
  }
};

module.exports = {
  auth,
  hashPassword,
  validatePassword,
  decodedToken,
  verifierToken,
  refreshAccessToken
};
