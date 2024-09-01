// Dependencies
import express from 'express';
// Schemas
import { validateItem } from '../../schemas/ItemSchema';
// Helpers
import { checkAdmin } from '../../helpers/user/UserHelper';
import { verifyToken } from '../../helpers/Token';
// Services
import { getItems, createItem, updateItem, deleteItem } from '../../services/item/ItemService';
// Custom error
import { errorHandler } from '../../config/CustomError';

const router = express.Router();

router.get("/",verifyToken,checkAdmin,async (req,res) => {
    try {
        const items = await getItems();
        res.status(200).json(items);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.post("/",verifyToken,checkAdmin,validateItem,async (req,res) => {
    try {
        const response = await createItem(req.body);
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.put("/:id",verifyToken,checkAdmin,validateItem,async (req,res) => {
    try {
        const response = await updateItem(Number(req.params.id),req.body);
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.delete("/:id",verifyToken,checkAdmin,async (req,res) => {
    try {
        const response = await deleteItem(Number(req.params.id));
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

module.exports = router;