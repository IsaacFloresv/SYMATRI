const { dataUser, user } = require("@models/index");

const getAll = async (req, res) => {
  try {
    let dataUsers = await dataUser.findAll({
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      include: [
        {
          model: user,
          attributes: { exclude: ["pass", "createdAt", "updatedAt"] },
          as: "Usuario",
        },
      ],
    });
    res.json(dataUsers);
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
    const { userId } = req.query;
    let dataUsers = await dataUser.findOne({
      where: {userId},
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      include: [
        {
          model: user,
          attributes: { exclude: ["id", "pass", "createdAt", "updatedAt"] },
          as: "Usuario",
        },
      ],
    });
    res.json(dataUsers);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;
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
  }
};

const update = async (req, res) => {
  try {
    const data = req.body;

    // Delegar autorización al middleware; aquí aplicamos los cambios enviados
    const where = data.id ? { id: data.id } : data.userId ? { userId: data.userId } : null;
    if (!where) return res.json([0]);

    let resp = await dataUser.update(data, { where });
    res.json(resp);
  } catch (error) {
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
  update
};
