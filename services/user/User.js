// Dependencies
const jwt = require("jsonwebtoken");
// Models
const Usuario = require('../../models/Usuario')
// Helpers
const { generatePassword, comparePassword } = require('../../helpers/user/Password')
// Env
const { jwt_key } = require("../../config/Config");

// Create user
function createUser(username,password,admin,objects) {
  const newUser = new Usuario({
    nombre: username,
    contrasena: generatePassword(password),
    admin: admin,
    objetos: objects
  });
  newUser.save();
  return newUser;
}
// Change user password
async function changePassword(id, oldPassword, newPassword) {
  const user = await Usuario.findOne({where: {id: id}});
  if (user && comparePassword(oldPassword, user.contrasena) == true) {
    user.contrasena = generatePassword(newPassword);
    user.save();
    return user;
  } else {
    return null;
  }
}
// User Login
async function login(username, password) {
  const user = await Usuario.findOne({where: {nombre: username}});
  const id = user.id;
  if (user && comparePassword(password, user.contrasena)) {
    const token = jwt.sign({ id }, jwt_key, { expiresIn: "1h" });
    return token;
  } else {
    return null;
  }
}

module.exports = {
    createUser,
    changePassword,
    login
};

