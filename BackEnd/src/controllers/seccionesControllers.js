const { secciones, user, dataUser } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let result = await secciones.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
       {
          model: user,
          attributes: { exclude: ["userId","pass", "roleId", "userName", "createdAt", "updatedAt"] },
          as: "ProfesorResponsable",
          include: [
       {
          model: dataUser,
          attributes: { exclude: ["userId","id","address", "telefono", "createdAt", "updatedAt"] },
          as: "datosPersonales",
        },
      ],
        },
      ],
    });
    res.json(result);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.body;
    let result = await secciones.findAll({
      where: {id},
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
       {
          model: user,
          attributes: { exclude: ["userId","pass", "roleId", "userName", "createdAt", "updatedAt"] },
          as: "ProfesorResponsable",
          include: [
       {
          model: dataUser,
          attributes: { exclude: ["userId","id","address", "telefono", "createdAt", "updatedAt"] },
          as: "datosPersonales",
        },
      ],
        },
      ],
    });
    res.json(result);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const create = async (req, res) => {
  try {
    const seccion  = req.body;
    let result = await secciones.create(seccion, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(result);
  } catch (error) {
    console.log(error)
    res.json({
      message: "No fue posible obtener la informacion",
      causa: error,
      res: false,
    });
  }
};

const update = async (req, res) => {
  try {
    const { seccion } = req.body;
    let result = await secciones.update(seccion, {
      where: { id: seccion.id },
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
    const { seccion } = req.body;
    let result = await secciones.update(seccion, {
      where: { id: seccion.id },
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
    const { id } = req.body;
    const name = ""
    /* let result = await secciones.update(name, {
      where: { id },
      fields: ["name"],
    }); */
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
