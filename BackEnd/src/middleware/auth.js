require('module-alias/register');

const {decodedToken, verifierToken} = require('@services/auth');

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  /* if (!verifierToken(token)) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    
  }; */
  
  next();
}

 function  authorizeRole (...rolesPermitidos) {
  return async (req, res, next) => {    
    let rol = req.body?.rol

    /* if(!rol) {
      let token = req.headers['authorization']?.split(' ')[1];
      rol = await verifierToken(token);
    }
    let roleName = rol.role || rol.nombre || rol;
    if (!rol || !rolesPermitidos.includes((roleName).toLowerCase())) {
      return res.status(403).json({ mensaje: 'Acceso denegado: rol no autorizado' });
    } */

    next();
  };
}

module.exports = {
  verifyToken,
  authorizeRole
};
