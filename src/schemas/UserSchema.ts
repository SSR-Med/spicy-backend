// Dependencies
import {z} from 'zod';
// Validator
import { validate } from '../helpers/Validator';

export const roleSchema = ['superadmin','role','user'];

// Interfaces
export interface registerInterface{
    name: string,
    password: string,
}

export interface createUserInterface extends registerInterface{
    role: string,
    objects: Record<string, any>
}

export interface modifyUserInterface{
    name: string,
    password?: string,
    role: string,
    objects: Record<string, any>
}

// Schemas
export const registerSchema = z.object({
    name: z.string().min(4),
    password: z.string().min(8)
});
export const createUserSchema = registerSchema.extend({
    role: z.enum(roleSchema as [string, ...string[]]),
    objects: z.record(z.any())
});
export const modifyUserSchema = z.object({
    name: z.string().min(4),
    password: z.string().min(8).nullable().optional(),
    role: z.enum(roleSchema as [string, ...string[]]),
    objects: z.record(z.any())
});

const changePasswordSchema = z.object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
}).strict()

// Validator
export const validateRegister = validate(registerSchema, "body");
export const createUserValidator = validate(createUserSchema, "body");
export const modifyUserValidator = validate(modifyUserSchema, "body");
export const changePasswordValidator = validate(changePasswordSchema, "body");
