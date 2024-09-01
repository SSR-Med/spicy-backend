// Dependencies
import {z} from 'zod';
// Validator
import { validate } from '../helpers/Validator';

// Interface
export interface itemInterface{
    name: string,
    xp: number
}

// Schema
export const ItemSchema = z.object({
    name: z.string().min(3).max(50),
    xp: z.number().int().positive()
});

// Validator
export const validateItem = validate(ItemSchema,"body");