const {
  materiaProfesors,
  materia,
  user,
  secciones,
  seccionProfesor,
  dataUser
} = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let data = await secciones.findAll({
      attributes: ["name", "periodo"],
      include: [
        {
          model: seccionProfesor,
          attributes: { exclude: ["seccionId", "id", "periodo", "createdAt", "updatedAt"] },
          as: "Seccion",
          include: [
            {
              model: user,
              attributes: ["id"],
              as: "Profesor",
              include: [
                {
                  model: dataUser,
                  attributes: ["firstName", "lastName"],
                  as: "datosPersonales",
                }
              ],
            }
          ]
        },
      ],
    });
    res.json(data);
  } catch (error) {
    console.log(error)
    res.json({
      message: "No fue posible obtener la informacion",
      mjs: error,
      res: false,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.body;
    let data = await secciones.findAll({
      where: { id },
      attributes: ["name", "periodo"],
      include: [
        {
          model: seccionProfesor,
          attributes: { exclude: ["seccionId", "id", "periodo", "createdAt", "updatedAt"] },
          as: "Seccion",
          include: [
            {
              model: user,
              attributes: ["id"],
              as: "Profesor",
              include: [
                {
                  model: dataUser,
                  attributes: ["firstName", "lastName"],
                  as: "datosPersonales",
                }
              ],
            }
          ]
        },
      ],
    });
    res.json(data);
  } catch (error) {
    console.log(error)
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const create = async (req, res) => {
  try {
    const registroN = req.body;
    let resp = await seccionProfesor.create(registroN);
    res.json(resp);
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
    const { id, ...data } = req.body;
    let resp = await seccionProfesor.update(data, {
      where: { id }
    });
    res.json(resp);
  } catch (error) {
    console.log(error)
    res.json({
      message: "No fue posible obtener la informacion",
      causa: error,
      res: false,
    });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
