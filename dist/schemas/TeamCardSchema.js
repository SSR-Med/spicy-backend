"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamCardValidator = exports.teamCardSchema = void 0;
// Dependencies
const zod_1 = require("zod");
// Validator
const Validator_1 = require("../helpers/Validator");
//Schema
exports.teamCardSchema = zod_1.z.object({
    userId: zod_1.z.number().min(0),
    userCardId: zod_1.z.number().min(0),
});
//Validator
exports.teamCardValidator = (0, Validator_1.validate)(exports.teamCardSchema, 'body');
