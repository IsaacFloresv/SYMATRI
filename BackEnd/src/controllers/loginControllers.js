const { User } = require("../database/models/index");

const login = async (req, res) => {
  try {
    const { pass } = req.query;
    let users = await User.findOne({
      where: pass,
      attributes: ["pass", "roleId"],
    });
    res.json(users);
  } catch (error) {
    res.json({
      message: "No fue posible obtener la informacion",
      res: false,
    });
  }
};

module.exports = {
  login,
};
