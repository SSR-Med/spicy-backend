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
// Service
const GachaService_1 = require("../../services/gacha/GachaService");
// Helpers
const Token_1 = require("../../helpers/Token");
// Custom error
const CustomError_1 = require("../../config/CustomError");
const router = express_1.default.Router();
// Endpoint to draw 1 or 10 cards
router.post("/draw", Token_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const amount = req.body.amount; // Either 1 or 10
        const userId = Number(req.params.idToken); // Extract userId from token
        const featuredCharacterId = req.body.featuredCharacterId; // Featured character ID
        // Call the drawCards service
        const result = yield (0, GachaService_1.drawCards)(userId, amount, featuredCharacterId);
        res.status(200).json(result); // Return drawn cards to the user
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res); // Handle errors consistently
    }
}));
module.exports = router;
