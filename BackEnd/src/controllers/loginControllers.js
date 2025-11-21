const { where } = require("sequelize");
const { User, dataUser } = require("../database/models/index");
const { refreshAccessToken, auth, validatePassword, hashPassword } = require('@services/auth');

const login = async (req, res) => {
  try {
    const { userName, pass } = req.body;
    const user = await User.findOne({
      where: { userName },
      attributes: ["id", "roleId", "pass"],
      include: [{
        model: dataUser,
        attributes: { exclude: ["id", "userId", "createdAt", "updatedAt"] },
        as: "datosPersonales"
      }],
      raw: true,
      nest: true
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario o Contraseña incorrecto.' });
    }

    const hashedPassword = user?.pass;
    if (!hashedPassword) {
      return res.status(400).json({ error: 'Usuario o Contraseña incorrecto.' });
    }

    const isPasswordValid = await validatePassword(pass, hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = await auth({ id: user.id, roleId: user.roleId });
    res.json({
      id: user.id,
      datosPersonales: user.datosPersonales,
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
  let user = req.body;
  let role = user.rol;
  let { roleId, active } = req?.body;
  if (roleId || active) {
    delete user.roleId;
    delete user.active;
  }
  if (role || role === 'guest') {
    user.pass = await hashPassword(user.pass);
    let result = await User.create(user);
    delete result.dataValues.pass;
    delete result.dataValues.roleId;
    delete result.dataValues.id;
    delete result.dataValues.active;
    delete result.dataValues.createdAt;
    delete result.dataValues.updatedAt;
    res.status(200).json({
      message: "En las siguientes 24 horas se enviara un correo para la activacion de su cuenta",
      success: true,
      result: result
    });
  } else {
    res.status(401).json({ error: 'No tiene permiso para registrarse' });
  }
}

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
    let result = await User.update(user, { where: { id } });
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
    let result = await User.update(user, { where: { id } });
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
  login, register, refreshToken, generateToken, forgotPass, activateAccount
};
