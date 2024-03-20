// Dependencies
const jwt = require("jsonwebtoken");
// Models
const Usuario = require('../../models/Usuario')
// Helpers
const { generatePassword, comparePassword } = require('../../helpers/user/Password')
// Env
const { jwt_key } = require("../../config/Config");

// Get all users
async function getUsers() {
  const users = await Usuario.findAll({
    attributes: {'exclude': ['contrasena']},
  });
  return users;
}
// Delete user
async function deleteUser(id) {
  const user = await Usuario.findOne({where: {id: id}});
  if (!user) {
    return null;
  }
  user.destroy();
  return user;
}
// Create user
async function createUser(username,password,admin,objects) {
  const searchUser = await Usuario.findOne({where: {nombre: username}});
  if (searchUser) {
    return null;
  }
  const newUser = new Usuario({
    nombre: username,
    contrasena: generatePassword(password),
    admin: admin,
    objetos: objects
  });
  newUser.save();
  return newUser;
}
// Modify user
async function modifyUser(id,newUsername,newPassword,newAdmin,newObjects) {
  const searchUser = await Usuario.findOne({where: {nombre: newUsername}});
  if (searchUser && searchUser.id != id) {
    return null;
  }
  const user = await Usuario.findOne({where: {id: id}});
  if (!user) {
    return null;
  }
  user.update({
    nombre: newUsername,
    contrasena: generatePassword(newPassword),
    admin: newAdmin,
    objetos: newObjects
  });
  return user;
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
    const token = jwt.sign({ id }, jwt_key, { expiresIn: "24h" });
    return token;
  } else {
    return null;
  }
}

module.exports = {
    getUsers,
    deleteUser,
    createUser,
    modifyUser,
    changePassword,
    login
};

