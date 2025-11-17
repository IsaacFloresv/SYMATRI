const { dataUser } = require("../database/models/index");
const { User } = require("../database/models/index");

const getAll = async (req, res) => {
  try {
    let dataUsers = await dataUser.findAll({
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          attributes: { exclude: ["pass", "createdAt", "updatedAt"] },
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

const getById = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(req.query);
    let dataUsers = await dataUser.findOne({
      where: {userId},
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      include: [
        {
          model: User,
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
    console.log(req.body);
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
    console.log(data);
    let resp = await dataUser.update(data, {
      where: { id: data.id },
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


module.exports = {
  getAll,
  getById,
  create,
  update
};
