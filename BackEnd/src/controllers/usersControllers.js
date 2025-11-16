const { User, dataUser } = require("@models/index");
const { hashPassword } = require('@services/auth');

const getAll = async (req, res) => {
  try {
    const { id } = req.query;

    const where = {};
    if (id) where.id = id;

    let users = await User.findAll({
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
    const { userId } = req.query;
    let users = await User.findOne({
      where: { userId: userId },
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
    let users = await User.create(user, {
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
    const user = req.body;
    if (user.pass) {
      user.pass = await hashPassword(user.pass);
    }
    let users = await User.update(user, {
      where: { id: user.id },
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
    const { user } = req.body;
    let users = await User.update(user, {
      where: { id: user.id },
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
    const { user } = req.body;
    let users = await User.update(user, {
      where: { id: user.id },
      attributes: ["active"],
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
