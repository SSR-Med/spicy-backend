// Dependencies
import {z} from 'zod';
// Validator
import { validate } from '../helpers/Validator';

export interface teamCardInterface {
    userCardId: number,
    userId: number,
}

//Schema
export const teamCardSchema = z.object({
    userId: z.number().min(0),
    userCardId: z.number().min(0),
});

//Validator
export const teamCardValidator = validate(teamCardSchema, 'body');