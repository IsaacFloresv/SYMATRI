const { user, dataUser } = require("@models/index");
const { hashPassword } = require('@services/auth');

const getAll = async (req, res) => {
  try {
    const { id } = req.query;

    const where = {};
    if (id) where.id = id;

    let users = await user.findAll({
      where,
      attributes: { exclude: ["id", "roleId","pass", "createdAt", "updatedAt"] },
      include: [
        {
          model: dataUser,
          attributes: { exclude: ["userId", "id", "createdAt", "updatedAt"] },
          as: "datosPersonales",
        },
      ],
    });
    res.json(users);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.query;
    let users = await user.findOne({
      where: { id },
      attributes: {
        exclude: ["userId", "pass", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: dataUser,
          attributes: { exclude: ["id", "userId", "createdAt", "updatedAt"] },
          as: "datosPersonales",
        },
      ],
    });
    res.json(users);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const create = async (req, res) => {
  try {
    const user = req.body;
    user.pass = await hashPassword(user.pass);
    let users = await user.create(user, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(users);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      causa: error,
      res: false,
    });
  }
};

const update = async (req, res) => {
  try {
    const payload = req.body;

    // si se envía pass, la hasheamos antes de guardar
    if (payload.pass) {
      payload.pass = await hashPassword(payload.pass);
    }

    // Delegar control de autorización al middleware; aquí sólo actualizamos con el payload recibido
    const users = await user.update(payload, {
      where: { id: payload.id },
    });

    res.json(users);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      causa: error,
      res: false,
    });
  }
};

const validate = async (req, res) => {
  try {
    const { id } = req.body;
    const isActive = {"active": true};
    let users = await user.update(isActive, {
      where: { id },
      fields: ["active"],
    });
    res.json(users);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      causa: error,
      res: false,
    });
  }
};

const deleteR = async (req, res) => {
  try {
    const { id } = req.body;
    const isActive = {"active": false};
    let users = await user.update(isActive, {
      where: { id },
      fields: ["active"],
    });
    res.json(users);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      cause: error,
      res: false,
    });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  validate,
  deleteR,
};
