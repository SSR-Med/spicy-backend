"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidator = exports.modifyUserValidator = exports.createUserValidator = exports.validateRegister = exports.modifyUserSchema = exports.createUserSchema = exports.registerSchema = exports.roleSchema = void 0;
// Dependencies
const zod_1 = require("zod");
// Validator
const Validator_1 = require("../helpers/Validator");
exports.roleSchema = ['superadmin', 'admin', 'user'];
// Schemas
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1)
});
exports.createUserSchema = exports.registerSchema.extend({
    role: zod_1.z.enum(exports.roleSchema),
    energy: zod_1.z.number().int().min(0).optional(),
    tokens: zod_1.z.number().int().min(0).optional()
});
exports.modifyUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1).nullable().optional(),
    role: zod_1.z.enum(exports.roleSchema),
    energy: zod_1.z.number().int().min(0),
    tokens: zod_1.z.number().int().min(0)
});
const changePasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string().min(1),
    newPassword: zod_1.z.string().min(1),
}).strict();
// Validator
exports.validateRegister = (0, Validator_1.validate)(exports.registerSchema, "body");
exports.createUserValidator = (0, Validator_1.validate)(exports.createUserSchema, "body");
exports.modifyUserValidator = (0, Validator_1.validate)(exports.modifyUserSchema, "body");
exports.changePasswordValidator = (0, Validator_1.validate)(changePasswordSchema, "body");
