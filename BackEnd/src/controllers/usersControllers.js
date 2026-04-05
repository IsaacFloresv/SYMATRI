const { user, dataUser, materiaProfesor, materias, roles } = require("@models/index");
const { hashPassword } = require('@services/auth');

const getAll = async (req, res) => {
  try {
    const { id } = req.query;

    const where = {};
    if (id) where.id = id;

    let users = await user.findAll({
      where,
      attributes: { exclude: ["id", "roleId", "pass", "createdAt", "updatedAt"] },
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

const getAllByRol = async (req, res) => {
  try {
    const { roleId } = req.query;

    const where = {};
    if (roleId) where.roleId = roleId;

    let users = await user.findAll({
      where,
      attributes: { exclude: ["pass", "createdAt", "updatedAt"] },
      include: [
        {
          model: dataUser,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          as: "datosPersonales",
        },{
          model: roles,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          as: "role",
        }, {
          model: materiaProfesor,
          attributes: { exclude: ["profesorId", "id", "createdAt", "updatedAt"] },
          as: "profesorAsignado",
          include: [
            {
              model: materias,
              attributes: { exclude: ["createdAt", "updatedAt"] },
              as: "materia",
            },
          ]
        },
      ],
    });
    res.json(users);
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

const getByEmail = async (emailP) => {
  try {
    const email = emailP;
    const userResult = await user.findOne({
      where: { email },
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
    return userResult;
  } catch (error) {
    console.error("getByEmail error", error);
    return null;
  }
};

const create = async (req, res) => {
  try {
    const userData = req.body;
    userData.pass = await hashPassword(userData.pass);

    const createdUser = await user.create(userData, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    // Si datosPersonales vienen, crear registro asociado en dataUser
    if (userData.datosPersonales) {
      await dataUser.create({
        ...userData.datosPersonales,
        userId: createdUser.id,
      });
    }

    const result = await user.findOne({
      where: { id: createdUser.id },
      attributes: { exclude: ["pass", "createdAt", "updatedAt"] },
      include: [{
        model: dataUser,
        as: "datosPersonales",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      }],
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
    const isActive = { "active": true };
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
    const isActive = { "active": false };
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
  getAllByRol,
  getById,
  getByEmail,
  create,
  update,
  validate,
  deleteR,
};
