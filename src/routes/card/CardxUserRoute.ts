//CardsxUserRoute: Ruta para las cartas de los usuarios
import express from "express";
import { httpError } from "../../config/CustomError";
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
// Subir de nivel una carta específica de un usuario
router.patch("/:userCardId", verifyToken, async (req, res) => {
    try {
        const cardUserId = String(req.params.userCardId); // ID de la carta del usuario
        const userId = Number(req.params.idToken);        // ID del usuario desde el token
        const xpAdded = Number(req.body.xpAdded);         // XP suministrada desde el cuerpo de la solicitud
        const usedMaggiItems = req.body.usedMaggiItems;               // IDs de los ítems suministrados desde el cuerpo de la solicitud
        const usedRicostillaItems = req.body.usedRicostillaItems;     // IDs de los ítems suministrados desde el cuerpo de la solicitud
        //console.log('Cuerpo de la solicitud:', req.body);

        // Asegúrate de validar que itemIds sea un array
        if (!Array.isArray(usedMaggiItems) || !Array.isArray(usedRicostillaItems)) {
            throw new httpError("Los ítems deben ser un array", 400);
        }

        const result = await upgradeCardLevel(userId, cardUserId, xpAdded, usedMaggiItems, usedRicostillaItems);

        res.status(200).json(result); // Respuesta con la carta actualizada
    } catch (error) {
        console.error("Error en upgradeCardLevel:", error);
        errorHandler(error, res);
    }
});


module.exports = router;
