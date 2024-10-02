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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const express_1 = __importDefault(require("express"));
// Services
const UserService_1 = require("../../services/user/UserService");
const Token_1 = require("../../helpers/Token");
// Custom error
const CustomError_1 = require("../../config/CustomError");
// Schemas
const UserSchema_1 = require("../../schemas/UserSchema");
// Helpers
const Token_2 = require("../../helpers/Token");
const router = express_1.default.Router();
router.patch("/", Token_2.verifyToken, UserSchema_1.changePasswordValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, UserService_1.changePassword)(Number(req.params.idToken), req.body.oldPassword, req.body.newPassword);
        res.status(200).json(response);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.delete("/", Token_2.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, UserService_1.deleteSelf)(Number(req.params.idToken));
        res.status(200).json(response);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.get("/name", Token_2.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, UserService_1.getName)(Number(req.params.idToken));
        res.status(200).json(response);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.get("/role", Token_2.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, UserService_1.getRole)(Number(req.params.idToken));
        res.status(200).json(response);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.post("/register", UserSchema_1.validateRegister, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, UserService_1.register)(req.body);
        res.status(200).json(response);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.get("/token", Token_2.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, Token_1.createToken)(Number(req.params.idToken));
        res.status(200).json({ token });
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.get("/admin", Token_2.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, UserService_1.checkAdmin)(Number(req.params.idToken));
        res.status(200).json({
            admin: response
        });
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.get("/resources", Token_2.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, UserService_1.getResources)(Number(req.params.idToken));
        res.status(200).json(response);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
module.exports = router;
