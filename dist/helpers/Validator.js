"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
// Validator
const validate = (schema, typeData) => (req, res, next) => {
    try {
        // Access the appropriate request body, query, or params based on route definition
        const data = req[typeData];
        schema.parse(data); // Perform Zod schema validation
        next(); // Proceed to the route handler if validation succeeds
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            console.log(error.errors); // Log detailed Zod validation errors
            // Handle Zod validation errors with detailed messages
            res.status(400).json({ message: "Datos invalidos" });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
exports.validate = validate;
