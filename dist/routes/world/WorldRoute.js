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
//Services
const WorldService_1 = require("../../services/world/WorldService");
const MissionService_1 = require("../../services/mission/MissionService");
// Custom error
const CustomError_1 = require("../../config/CustomError");
// Helpers
const Token_1 = require("../../helpers/Token");
const router = express_1.default.Router();
router.get("/", Token_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, WorldService_1.getWorlds)();
        res.status(200).json(response);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.get("/:worldId", Token_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, MissionService_1.getMissionByWorld)(Number(req.params.worldId));
        res.status(200).json(response);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
module.exports = router;
