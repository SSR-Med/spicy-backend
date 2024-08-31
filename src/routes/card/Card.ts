// Dependencies
import express from 'express';
// Services
import { getCard, getCards, createCard, deleteCard, updateCard } from '../../services/card/CardService';
// Schemas
import { cardValidator } from '../../schemas/CardSchema';
// Helpers
import { checkAdmin } from '../../helpers/user/UserHelper';
import { verifyToken } from '../../helpers/Token';
// Custom error
import { errorHandler } from '../../config/CustomError';

const router = express.Router();

router.get("/",verifyToken,checkAdmin,async (req,res) => {
    try {
        const response = await getCards();
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.get("/:id",verifyToken,async (req,res) => {
    try {
        const response = await getCard(Number(req.params.id));
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.post("/",verifyToken,checkAdmin,cardValidator,async (req,res) => {
    try {
        const response = await createCard(req.body,Number(req.params.idToken));
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.delete("/:id",verifyToken,checkAdmin,async (req,res) => {
    try {
        const response = await deleteCard(Number(req.params.id),Number(req.params.idToken));
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.put("/:id",verifyToken,checkAdmin,cardValidator,async (req,res) => {
    try {
        const response = await updateCard(Number(req.params.id),req.body,Number(req.params.idToken));
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

module.exports = router