import express from "express";

// Services
import{ getCardsxUser, getCardxUser} from "../../services/card/CardxUserService";
// Helpers
import { verifyToken } from "../../helpers/Token";
// Custom error
import { errorHandler } from "../../config/CustomError";

const router = express.Router();

router.get("/",verifyToken,async (req,res) => {
    try {
        const cards = await getCardsxUser(Number(req.params.idToken));
        res.status(200).json(cards);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.get("/:userCardId",verifyToken, async (req, res) => {
    try {
        const card = await getCardxUser(Number(req.params.userCardId));
        res.status(200).json(card);
    } catch (error) {
        errorHandler(error,res);
    }
})


module.exports = router;