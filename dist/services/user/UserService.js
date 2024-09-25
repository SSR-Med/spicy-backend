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
exports.login = login;
exports.changePassword = changePassword;
exports.getName = getName;
exports.deleteSelf = deleteSelf;
exports.getRole = getRole;
exports.register = register;
exports.checkAdmin = checkAdmin;
exports.getResources = getResources;
// Dependencies
const jwt = require("jsonwebtoken");
// Models
const User_1 = require("../../models/User");
// Custom error
const CustomError_1 = require("../../config/CustomError");
// Helpers
const UserHelper_1 = require("../../helpers/user/UserHelper");
const FormatString_1 = require("../../helpers/FormatString");
// Env variables
const Constants_1 = require("../../config/Constants");
function login(name, password) {
    return __awaiter(this, void 0, void 0, function* () {
        name = (0, FormatString_1.capitalizeWords)((0, FormatString_1.deleteBlankSpaces)(name));
        const searchUser = yield User_1.User.findOne({ where: { name: name } });
        if (!searchUser) {
            throw new CustomError_1.httpError("Credenciales invalidas", 404);
        }
        const compare = yield (0, UserHelper_1.comparePassword)(password, searchUser.password);
        if (!compare) {
            throw new CustomError_1.httpError("Credenciales invalidas", 400);
        }
        const id = searchUser.id;
        const token = jwt.sign({ id }, Constants_1.jwt_key, { expiresIn: Constants_1.jwt_expires_in });
        return token;
    });
}
function changePassword(id, oldPassword, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { id: id } });
        if (!user)
            throw new CustomError_1.httpError("Usuario no encontrado", 404);
        if (!(0, UserHelper_1.comparePassword)(oldPassword, user.password))
            throw new CustomError_1.httpError("Credenciales incorrectas", 400);
        yield user.update({ password: (0, UserHelper_1.hashPassword)(newPassword) });
        return { message: "Contraseña actualizada" };
    });
}
function getName(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { id: id } });
        if (!user)
            throw new CustomError_1.httpError("Usuario no encontrado", 404);
        return { name: user.name };
    });
}
function deleteSelf(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { id: id } });
        if (!user)
            throw new CustomError_1.httpError("Usuario no encontrado", 404);
        yield user.destroy();
    });
}
function getRole(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { id: id } });
        if (!user)
            throw new CustomError_1.httpError("Usuario no encontrado", 404);
        return { role: user.role };
    });
}
function register(registerInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        // Change the user name
        registerInterface.name = (0, FormatString_1.capitalizeWords)((0, FormatString_1.deleteBlankSpaces)(registerInterface.name));
        // Check if the user already exists
        const searchUser = yield User_1.User.findOne({ where: { name: registerInterface.name } });
        if (searchUser)
            throw new CustomError_1.httpError('Este usuario ya existe', 400);
        // Create the user
        yield User_1.User.create(Object.assign(Object.assign({}, registerInterface), { password: (0, UserHelper_1.hashPassword)(registerInterface.password) }));
        return { "message": "Usuario creado" };
    });
}
function checkAdmin(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { id: id } });
        if (!user)
            throw new CustomError_1.httpError("Usuario no encontrado", 404);
        if (user.role === 'user')
            return false;
        else
            return true;
    });
}
function getResources(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { id: id } });
        if (!user)
            throw new CustomError_1.httpError("Usuario no encontrado", 404);
        return { energy: user.energy, boosters: user.boosters, tokens: user.tokens };
    });
}
