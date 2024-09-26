import express from "express";

//Services
import { createTeamCard, deleteTeamcard, getTeamCard, getTeamCardsByUser } from "../../services/card/TeamCardService";
// Helpers
import { verifyToken } from "../../helpers/Token";
// Custom error
import { errorHandler } from "../../config/CustomError";
import { teamCardValidator } from "../../schemas/TeamCardSchema";

const router = express.Router();

router.get("/",verifyToken, async (req,res) => {
    try {
        const teamCards = await getTeamCardsByUser(Number(req.params.idToken));
        res.status(200).json(teamCards);
    } catch (error) {
        errorHandler(error,res);
    }
});

router.post("/",verifyToken,teamCardValidator, async (req, res) => {
    try {
        const response = await createTeamCard(req.body);
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
});

router.delete("/:id",verifyToken, async (req, res) => {
    try {
        const response = await deleteTeamcard(Number(req.params.id));
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
});

router.get("/:id",verifyToken, async (req, res) => {
    try {
        const response = await getTeamCard((Number(req.params.id)));
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
});

module.exports = router;