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
exports.getCardsxUser = getCardsxUser;
exports.getCardxUser = getCardxUser;
//Models
const CardxUser_1 = require("../../models/CardxUser");
const Card_1 = require("../../models/Card");
//Custom error
const CustomError_1 = require("../../config/CustomError");
function getCardsxUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cards = yield CardxUser_1.CardxUser.findAll({
            where: { id_user: userId },
            include: [
                {
                    model: Card_1.Card,
                    attributes: ['name']
                }
            ]
        });
        return cards;
    });
}
function getCardxUser(userCardId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield CardxUser_1.CardxUser.findOne({
            where: { id: userCardId },
            include: [
                {
                    model: Card_1.Card,
                    attributes: ['name']
                }
            ]
        });
        if (!card)
            throw new CustomError_1.httpError("Carta no encontrada", 404);
        return card;
    });
}
