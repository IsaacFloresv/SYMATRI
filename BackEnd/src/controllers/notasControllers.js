const { notas, User, dataUser, materias } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let Notas = await notas.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: materias,
          attributes: ["name"],
          as: "materia",          
        },
       {
          model: User,
          attributes: ["id"],
          as: "alumnoNota",
          include: [
       {
          model: dataUser,
          attributes: ["firstName", "lastName"],
          as: "datosPersonales",
        },
      ],
        },
        {
          model: User,
          attributes: ["id"],
          as: "autor",
          include: [
       {
          model: dataUser,
          attributes: ["firstName", "lastName"],
          as: "datosPersonales",
        },
      ],
        }
      ],
    });
    res.json(Notas);
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
    let Nota = await notas.findOne({
      where: {id},
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: materias,
          attributes: ["name"],
          as: "materia",          
        },
       {
          model: User,
          attributes: ["id"],
          as: "alumnoNota",
          include: [
       {
          model: dataUser,
          attributes: ["firstName", "lastName"],
          as: "datosPersonales",
        },
      ],
        },
        {
          model: User,
          attributes: ["id"],
          as: "autor",
          include: [
       {
          model: dataUser,
          attributes: ["firstName", "lastName"],
          as: "datosPersonales",
        },
      ],
        }
      ],
    });
    res.json(Nota);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const getByAlumnoId = async (req, res) => {
  try {
    const { id, alumnoId } = req.body;
    let Nota = await notas.findOne({
      where: {id, alumnoId},
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: materias,
          attributes: ["name"],
          as: "materia",          
        },
       {
          model: User,
          attributes: ["id"],
          as: "alumnoNota",
          include: [
       {
          model: dataUser,
          attributes: ["firstName", "lastName"],
          as: "datosPersonales",
        },
      ],
        },
        {
          model: User,
          attributes: ["id"],
          as: "autor",
          include: [
       {
          model: dataUser,
          attributes: ["firstName", "lastName"],
          as: "datosPersonales",
        },
      ],
        }
      ],
    });

    if(!Nota) res.status(404).json({message:"No existe el registro solicitado"});
    res.json(Nota);
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
    const registroN  = req.body;
    let Nota = await notas.bulkCreate(registroN, {
      //attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(Nota);
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
    let Nota = await notas.update(registroU, {
      where: { id: registroU.id },
    });
    res.json(Nota);
  } catch (error) {
    console.log(error)
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
    let Nota = await notas.update(registro, {
      where: { id: registro.id },
      fields: ["active"],
    });
    res.json(Nota);
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
    let Nota = await notas.update(registro, {
      where: { id: registro.id },
      fields: ["active"],
    });
    res.json(Nota);
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
  getByAlumnoId,
  create,
  update,
  validate,
  deleteR,
};
