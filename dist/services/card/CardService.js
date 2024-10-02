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
exports.createCard = createCard;
exports.deleteCard = deleteCard;
exports.getCards = getCards;
exports.getCard = getCard;
exports.updateCard = updateCard;
// Models
const Card_1 = require("../../models/Card");
const User_1 = require("../../models/User");
// Custom error
const CustomError_1 = require("../../config/CustomError");
function createCard(card, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user who wants to create the new card
        const user = yield User_1.User.findOne({ where: { id: userId } });
        // Check permissions
        if (user.role === "user")
            throw new CustomError_1.httpError("No tienes permisos para crear una carta", 401);
        // Check if the card already exists
        const searchCard = yield Card_1.Card.findOne({ where: { name: card.name } });
        if (searchCard)
            throw new CustomError_1.httpError("Carta ya existente", 400);
        // Create the card
        yield Card_1.Card.create(card);
        return { message: "Carta creada" };
    });
}
function deleteCard(cardId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user who wants to create the new card
        const user = yield User_1.User.findOne({ where: { id: userId } });
        // Check permissions
        if (user.role === "user")
            throw new CustomError_1.httpError("No tienes permisos para borrar una carta", 401);
        // Search for the card
        const card = yield Card_1.Card.findOne({ where: { id: cardId } });
        if (!card)
            throw new CustomError_1.httpError("Carta no encontrada", 404);
        yield card.destroy();
        return { message: "Carta eliminada" };
    });
}
function getCards() {
    return __awaiter(this, void 0, void 0, function* () {
        const cards = yield Card_1.Card.findAll({
            order: [["id", "ASC"]],
        });
        return cards;
    });
}
function getCard(cardId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield Card_1.Card.findOne({ where: { id: cardId } });
        if (!card)
            throw new CustomError_1.httpError("Carta no encontrada", 404);
        return card;
    });
}
function updateCard(cardId, card, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user who wants to create the new card
        const user = yield User_1.User.findOne({ where: { id: userId } });
        // Check permissions
        if (user.role === "user")
            throw new CustomError_1.httpError("No tienes permisos para modificar una carta", 401);
        // Search for the card
        const searchCard = yield Card_1.Card.findOne({ where: { id: cardId } });
        if (!searchCard)
            throw new CustomError_1.httpError("Carta no encontrada", 404);
        // Check if the card already exists
        if (searchCard.name !== card.name) {
            const searchCard = yield Card_1.Card.findOne({ where: { name: card.name } });
            if (searchCard)
                throw new CustomError_1.httpError("Carta ya existente", 400);
        }
        yield searchCard.update(card);
        return { message: "Carta modificada" };
    });
}
