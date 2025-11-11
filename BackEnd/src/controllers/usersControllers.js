const { User } = require("../database/models/index");
const { dataUser } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: { exclude: ["id", "roleId","createdAt", "updatedAt"] },
      include: [
       {
          model: dataUser,
          attributes: { exclude: ["userId","id","createdAt", "updatedAt"] },
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
      where: userId,
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
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

const createU = async (req, res) => {
  try {
    const { user } = req.body;
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

const updateU = async (req, res) => {
  try {
    const { user } = req.body;
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

const validateU = async (req, res) => {
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

const deleteU = async (req, res) => {
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
  createU,
  updateU,
  validateU,
  deleteU,
};
