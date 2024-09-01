// Dependencies
import {z} from 'zod';
// Validator
import { validate } from '../helpers/Validator';

// Interfaces
export interface cardInterface{
    name: string,
    rarity: number,
    health: number,
    attack: number,
    defense: number,
    evasion: number
}

// Schemas
export const cardSchema = z.object({
    name: z.string().min(1),
    rarity: z.number().min(0).max(1),
    health: z.number().int().min(0),
    attack: z.number().int().min(0),
    defense: z.number().int().min(0),
    evasion: z.number().int().min(0),
});

// Validator
export const cardValidator = validate(cardSchema, "body");