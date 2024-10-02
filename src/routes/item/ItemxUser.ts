// Dependencies
import express from 'express';
// Services
import { getQuantityItem4User, getItemsxUser, createItemxUser, deleteItemxUser } from '../../services/item/ItemxUserService';
// Helpers
import { checkAdmin } from '../../helpers/user/UserHelper';
import { verifyToken } from '../../helpers/Token';
// Custom error
import { errorHandler } from '../../config/CustomError';

const router = express.Router();

router.get("/",verifyToken,async (req,res) => {
    try {
        const items = await getItemsxUser(Number(req.params.idToken));
        res.status(200).json(items);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.get("/quantity",verifyToken,async (req,res) => {
    try {
        const items = await getQuantityItem4User(Number(req.params.idToken));
        res.status(200).json(items);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.post("/", verifyToken, async (req,res) => {
    try {
        const response = await createItemxUser(Number(req.params.idToken),req.body.id_item);
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.delete("/:id", verifyToken, async (req,res) => {
    try {
        const response = await deleteItemxUser(Number(req.params.idToken),Number(req.params.id));
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

module.exports = router;
