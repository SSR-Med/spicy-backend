"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardValidator = exports.cardSchema = void 0;
// Dependencies
const zod_1 = require("zod");
// Validator
const Validator_1 = require("../helpers/Validator");
// Schemas
exports.cardSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    rarity: zod_1.z.number().min(0).max(1).min(0),
    health: zod_1.z.number().int().min(0),
    attack: zod_1.z.number().int().min(0),
    defense: zod_1.z.number().int().min(0),
    evasion: zod_1.z.number().int().min(0),
    xp_limit: zod_1.z.number().int().min(0)
});
// Validator
exports.cardValidator = (0, Validator_1.validate)(exports.cardSchema, "body");
