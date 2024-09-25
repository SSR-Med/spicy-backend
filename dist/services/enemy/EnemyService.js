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
exports.getEnemiesByMission = getEnemiesByMission;
//Models
const Enemy_1 = require("../../models/Enemy");
const Card_1 = require("../../models/Card");
function getEnemiesByMission(missionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const enemyCards = yield Enemy_1.Enemy.findAll({
            where: { missionId: missionId },
            include: [
                {
                    model: Card_1.Card,
                    attributes: ['name', 'health', 'attack', 'defense', 'evasion']
                }
            ]
        });
        return enemyCards;
    });
}
