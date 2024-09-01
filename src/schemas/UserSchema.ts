// Dependencies
import {z} from 'zod';
// Validator
import { validate } from '../helpers/Validator';

export const roleSchema = ['superadmin','admin','user'];

// Interfaces
export interface registerInterface{
    name: string,
    password: string,
}

export interface createUserInterface extends registerInterface{
    role: string,
    energy?: number,
    tokens?: number
}

export interface modifyUserInterface{
    name: string,
    password?: string,
    role: string,
    energy: number,
    tokens: number
}

// Schemas
export const registerSchema = z.object({
    name: z.string().min(1),
    password: z.string().min(1)
});
export const createUserSchema = registerSchema.extend({
    role: z.enum(roleSchema as [string, ...string[]]),
    energy: z.number().int().min(0).positive().optional(),
    tokens: z.number().int().min(0).positive().optional()
});
export const modifyUserSchema = z.object({
    name: z.string().min(1),
    password: z.string().min(1).nullable().optional(),
    role: z.enum(roleSchema as [string, ...string[]]),
    energy: z.number().int().min(0).positive(),
    tokens: z.number().int().min(0).positive()
});

const changePasswordSchema = z.object({
    oldPassword: z.string().min(1),
    newPassword: z.string().min(1),
}).strict()

// Validator
export const validateRegister = validate(registerSchema, "body");
export const createUserValidator = validate(createUserSchema, "body");
export const modifyUserValidator = validate(modifyUserSchema, "body");
export const changePasswordValidator = validate(changePasswordSchema, "body");
