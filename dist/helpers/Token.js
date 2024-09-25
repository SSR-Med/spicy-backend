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
exports.verifyToken = verifyToken;
exports.createToken = createToken;
// Dependencies
const jwt = require('jsonwebtoken');
// Env
const Constants_1 = require("../config/Constants");
// Models
const User_1 = require("../models/User");
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const header = req.header('Authorization') || '';
        const token = header.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No existe token' });
        }
        try {
            const payload = jwt.verify(token, Constants_1.jwt_key);
            req.params.idToken = payload.id;
            const user = yield User_1.User.findOne({ where: { id: payload.id } });
            if (!user) {
                return res.status(404).json({ message: 'No es valido el token' });
            }
            next();
        }
        catch (error) {
            return res.status(403).json({ message: 'No es valido el token' });
        }
    });
}
function createToken(id) {
    return jwt.sign({ id: id }, Constants_1.jwt_key, { expiresIn: Constants_1.jwt_expires_in });
}
