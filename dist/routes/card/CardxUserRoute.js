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
const express_1 = __importDefault(require("express"));
// Services
const CardxUserService_1 = require("../../services/card/CardxUserService");
// Helpers
const Token_1 = require("../../helpers/Token");
// Custom error
const CustomError_1 = require("../../config/CustomError");
const router = express_1.default.Router();
router.get("/", Token_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cards = yield (0, CardxUserService_1.getCardsxUser)(Number(req.params.idToken));
        res.status(200).json(cards);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.get("/:userCardId", Token_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const card = yield (0, CardxUserService_1.getCardxUser)(Number(req.params.userCardId));
        res.status(200).json(card);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
module.exports = router;
