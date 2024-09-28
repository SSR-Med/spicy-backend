import express from "express";

// Services
import { getCardsxUser, getCardxUser, upgradeCardLevel } from "../../services/card/CardxUserService";
// Helpers
import { verifyToken } from "../../helpers/Token";
// Custom error
import { errorHandler } from "../../config/CustomError";

const router = express.Router();

// Obtener todas las cartas de un usuario
router.get("/", verifyToken, async (req, res) => {
    try {
        const cards = await getCardsxUser(Number(req.params.idToken));
        res.status(200).json(cards);
    } catch (error) {
        errorHandler(error, res);
    }
});

// Obtener una carta específica de un usuario
router.get("/:userCardId", verifyToken, async (req, res) => {
    try {
        const card = await getCardxUser(Number(req.params.userCardId));
        res.status(200).json(card);
    } catch (error) {
        errorHandler(error, res);
    }
});

// Subir de nivel una carta específica de un usuario
router.patch("/:userCardId", verifyToken, async (req, res) => {
    try {
        const cardUserId = Number(req.params.userCardId); // ID de la carta del usuario
        const userId = Number(req.params.idToken);        // ID del usuario desde el token
        const xpAdded = req.body.xp;                      // XP suministrada desde el cuerpo de la solicitud

        const result = await upgradeCardLevel(userId, cardUserId, xpAdded);

        res.status(200).json(result); // Respuesta con la carta actualizada
    } catch (error) {
        errorHandler(error, res); // Manejar errores
    }
});

module.exports = router;
