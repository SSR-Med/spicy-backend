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
// Schemas
const ItemSchema_1 = require("../../schemas/ItemSchema");
// Helpers
const UserHelper_1 = require("../../helpers/user/UserHelper");
const Token_1 = require("../../helpers/Token");
// Services
const ItemService_1 = require("../../services/item/ItemService");
// Custom error
const CustomError_1 = require("../../config/CustomError");
const router = express_1.default.Router();
router.get("/", Token_1.verifyToken, UserHelper_1.checkAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield (0, ItemService_1.getItems)();
        res.status(200).json(items);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.post("/", Token_1.verifyToken, UserHelper_1.checkAdmin, ItemSchema_1.validateItem, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, ItemService_1.createItem)(req.body);
        res.status(200).json(response);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.put("/:id", Token_1.verifyToken, UserHelper_1.checkAdmin, ItemSchema_1.validateItem, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, ItemService_1.updateItem)(Number(req.params.id), req.body);
        res.status(200).json(response);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.delete("/:id", Token_1.verifyToken, UserHelper_1.checkAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, ItemService_1.deleteItem)(Number(req.params.id));
        res.status(200).json(response);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
module.exports = router;
