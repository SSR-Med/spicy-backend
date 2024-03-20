// Models
const Usuario = require('../../models/Usuario');

async function checkAdmin(req, res, next) {
  const user = await Usuario.findOne({where: {id: req.id}});
  if(user && user.admin) {
    next();
  }
  else{
    return res.status(403).json({ message: "User is not admin" });
  }
}

module.exports = {
    checkAdmin
};