"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
// Models
const User_1 = require("../../models/User");
// Custom error
const CustomError_1 = require("../../config/CustomError");
// Helpers
const SearchModel_1 = require("../../helpers/SearchModel");
const UserHelper_1 = require("../../helpers/user/UserHelper");
const FormatString_1 = require("../../helpers/FormatString");
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield User_1.User.findAll({
            order: [['id', 'ASC']],
        });
        users.forEach((user) => {
            user.dataValues.password = '';
        });
        return users;
    });
}
function createUser(createUserInterface, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user who wants to create the new user
        const userAdmin = yield User_1.User.findOne({ where: { id: userId } });
        // Change the user name
        createUserInterface.name = (0, FormatString_1.capitalizeWords)((0, FormatString_1.deleteBlankSpaces)(createUserInterface.name));
        // Check if the user already exists
        if (!(yield (0, SearchModel_1.searchModel)(User_1.User, [{ name: createUserInterface.name }])))
            throw new CustomError_1.httpError('Este usuario ya existe', 400);
        // Check permissions
        if (createUserInterface.role === 'superadmin')
            throw new CustomError_1.httpError('No tienes permisos para crear un superadmin', 400);
        if (userAdmin.role === 'admin' && createUserInterface.role === 'admin')
            throw new CustomError_1.httpError('No tienes permisos para crear un admin', 400);
        // Create the user
        yield User_1.User.create(Object.assign(Object.assign({}, createUserInterface), { password: (0, UserHelper_1.hashPassword)(createUserInterface.password) }));
        return { "message": "Usuario creado" };
    });
}
function updateUser(id, modifyUserInterface, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user who wants to create the new user
        const userAdmin = yield User_1.User.findOne({ where: { id: userId } });
        // Change the user name
        modifyUserInterface.name = (0, FormatString_1.capitalizeWords)((0, FormatString_1.deleteBlankSpaces)(modifyUserInterface.name));
        // Check if the user already exists
        if (!(yield (0, SearchModel_1.compareSearchModel)(User_1.User, [{ name: modifyUserInterface.name }], id)))
            throw new CustomError_1.httpError('Este usuario ya existe', 400);
        const user = yield User_1.User.findOne({ where: { id: id } });
        // Check permissions
        if (userId != id) {
            if (userAdmin.role === 'admin' && user.role != 'user')
                throw new CustomError_1.httpError('No tienes permisos para modificar un admin', 400);
            if (modifyUserInterface.role === 'superadmin')
                throw new CustomError_1.httpError('No tienes permisos para modificar un superadmin', 400);
            if (userAdmin.role === 'admin' && modifyUserInterface.role != 'user')
                throw new CustomError_1.httpError('No tienes permisos para modificar un admin', 400);
        }
        if (userId == id) {
            if (userAdmin.role != modifyUserInterface.role)
                throw new CustomError_1.httpError('No puedes modificar tu propio rol', 400);
        }
        const updateData = modifyUserInterface.password != null ? Object.assign(Object.assign({}, modifyUserInterface), { password: (0, UserHelper_1.hashPassword)(modifyUserInterface.password) }) : Object.assign(Object.assign({}, modifyUserInterface), { password: user.password });
        yield user.update(updateData);
        return { "message": "Usuario modificado" };
    });
}
function deleteUser(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user who wants to create the new user
        const userAdmin = yield User_1.User.findOne({ where: { id: userId } });
        // Check if the user exists
        const user = yield User_1.User.findOne({ where: { id: id } });
        if (!user)
            throw new CustomError_1.httpError('Este usuario no existe', 400);
        // Check permissions
        if (userId === id)
            throw new CustomError_1.httpError('No puedes eliminarte a ti mismo', 400);
        if (userAdmin.role === 'admin' && user.role != 'user')
            throw new CustomError_1.httpError('No tienes permisos para eliminar un admin', 400);
        yield user.destroy();
        return { "message": "Usuario eliminado" };
    });
}
