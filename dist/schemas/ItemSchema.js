"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateItem = exports.ItemSchema = void 0;
// Dependencies
const zod_1 = require("zod");
// Validator
const Validator_1 = require("../helpers/Validator");
// Schema
exports.ItemSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(50),
    xp: zod_1.z.number().int().min(0)
});
// Validator
exports.validateItem = (0, Validator_1.validate)(exports.ItemSchema, "body");
