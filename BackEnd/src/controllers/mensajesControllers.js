const { Op } = require("sequelize");

const { mensajes, User, dataUser } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let result = await mensajes.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          attributes: { exclude: ["id", "pass", "active", "roleId", "createdAt", "updatedAt"] },
          as: "emisor",
          include: [
            {
              model: dataUser,
              attributes: { exclude: ["id", "createdAt", "updatedAt"] },
              as: "datosPersonales",
            },
          ],
        }
      ],
    });

    // Paso 1: acceder al campo receptorId
    const receptorRaw = result;
    console.log(receptorRaw); 


    /*
     result.receptores = await User.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: dataUser,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          as: "datosPersonales",
        },
      ],
    }); */

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.query;
    let result = await mensajes.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          attributes: { exclude: ["id", "pass", "active", "roleId", "createdAt", "updatedAt"] },
          as: "emisor",
          include: [
            {
              model: dataUser,
              attributes: { exclude: ["id", "createdAt", "updatedAt"] },
              as: "datosPersonales",
            },
          ],
        },
        {
          model: User,
          attributes: { exclude: ["id", "pass", "active", "roleId", "createdAt", "updatedAt"] },
          as: "receptor",
          include: [
            {
              model: dataUser,
              attributes: { exclude: ["id", "pass", "active", "roleId", "createdAt", "updatedAt"] },
              as: "datosPersonales",
            },
          ],
        }
      ],
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const create = async (req, res) => {
  try {
    const registroN = req.body;
    let result = await mensajes.create(registroN);
    res.json(result);
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
    const registroU = req.body;
    let result = await mensajes.update(registroU, {
      where: { id: registroU.id },
    });
    res.json(result);
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
    const { registro } = req.body;
    let result = await mensajes.update(registro, {
      where: { id: registro.id },
      fields: ["active"],
    });
    res.json(result);
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
    const { registro } = req.body;
    let result = await mensajes.update(registro, {
      where: { id: registro.id },
      attributes: ["active"],
    });
    res.json(result);
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
