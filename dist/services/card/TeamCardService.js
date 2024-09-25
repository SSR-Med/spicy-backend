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
exports.getTeamCardsByUser = getTeamCardsByUser;
exports.createTeamCard = createTeamCard;
exports.deleteTeamcard = deleteTeamcard;
//Models
const CardxUser_1 = require("../../models/CardxUser");
const TeamCard_1 = require("../../models/TeamCard");
//Custom error
const CustomError_1 = require("../../config/CustomError");
const Card_1 = require("../../models/Card");
function getTeamCardsByUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const teamCards = yield TeamCard_1.TeamCard.findAll({
            where: { userId: userId },
            include: [
                {
                    model: CardxUser_1.CardxUser,
                    attributes: ['id', 'attack', 'defense', 'evasion', 'health'],
                    include: [
                        {
                            model: Card_1.Card,
                            attributes: ['name']
                        }
                    ]
                },
            ]
        });
        return teamCards;
    });
}
function createTeamCard(teamCard) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchTeamCard = yield TeamCard_1.TeamCard.findOne({ where: { userId: teamCard.userId, userCardId: teamCard.userCardId } });
        if (searchTeamCard)
            return;
        yield TeamCard_1.TeamCard.create(teamCard);
        return { message: "Carta agregada al equipo del usuario" };
    });
}
function deleteTeamcard(teamCardId) {
    return __awaiter(this, void 0, void 0, function* () {
        const teamCard = yield TeamCard_1.TeamCard.findOne({ where: { id: teamCardId } });
        if (!teamCard)
            throw new CustomError_1.httpError("Carta no encontrada", 404);
        yield teamCard.destroy();
        return { message: "Carta eliminada del equipo del usuario" };
    });
}
