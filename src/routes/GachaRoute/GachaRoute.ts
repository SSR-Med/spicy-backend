// Dependencies
import express from 'express';
// Service
import { drawCards } from '../../services/gacha/GachaService';
// Helpers
import { verifyToken } from '../../helpers/Token';
// Custom error
import { errorHandler } from '../../config/CustomError';

const router = express.Router();

// Endpoint to draw 1 or 10 cards
router.post("/draw", verifyToken, async (req, res) => {
    try {
        const amount = req.body.amount; // Either 1 or 10
        const userId = Number(req.params.idToken); // Extract userId from token
        const featuredCharacterId = req.body.featuredCharacterId; // Featured character ID

        // Call the drawCards service
        const result = await drawCards(userId, amount, featuredCharacterId);

        res.status(200).json(result); // Return drawn cards to the user
    } catch (error) {
        errorHandler(error, res); // Handle errors consistently
    }
});

module.exports = router;