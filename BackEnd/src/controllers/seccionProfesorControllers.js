const {
  User,
  secciones,
  seccionProfesor,
  dataUser
} = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let data = await seccionProfesor.findAll({
      attributes: ["createdAt"],
      include: [
        {
          model: secciones,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          as: "Seccion",
          include: [
            {
              model: User,
              attributes: ["createdAt"],
              as: "ProfesorResponsable",
              include: [
                {
                  model: dataUser,
                  attributes: ["firstName","lastName","telefono"],
                  as: "datosPersonales",
                },
              ],
            },
          ] /*      {
          model: User,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          as: "Profesores",
        }, */,
        },
      ],
    });
    res.json(data);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      mjs: error,
      res: false,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { seccionId } = req.query;
    let data = await seccionProfesor.findOne({
      where: seccionId,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Seccion,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          as: "Seccion",
        },
      ],
    });
    res.json(data);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const create = async (req, res) => {
  /* try {
    console.log(req.body);
    const { data } = req.body;
    let resp = await dataUser.create(data, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(resp);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      causa: error,
      res: false,
    });
  } */
};

const update = async (req, res) => {
  /* try {
    const { userId, ...data } = req.body.data;
    let resp = await dataUser.update(data, {
      where: { id: userId }
    });
    res.json(resp);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      causa: error,
      res: false,
    });
  } */
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
