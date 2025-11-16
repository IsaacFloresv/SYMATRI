const { User, dataUser } = require("../database/models/index");
const { create } = require("./usersControllers");
const { refreshAccessToken, auth, validatePassword } = require('@services/auth');

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

    const token  = await auth({ id: user.id, roleId: user.roleId });
    res.json({
      id: user.id,
      datosPersonales: user.datosPersonales,
      token: token
    });

  } catch (error) {
    res.status(500).json({
      message: "No fue posible obtener la información",
      success: false
    });
  }
};

const register = async (req, res) => {
  return await create(req, res);
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
  login, register, refreshToken, generateToken
};
