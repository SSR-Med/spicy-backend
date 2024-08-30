// Dependencies
import express from 'express';
// Services
import { getUsers, createUser, updateUser, deleteUser } from '../../services/user/AdminService';
// Schemas
import { createUserValidator, modifyUserValidator } from '../../schemas/UserSchema';
// Helpers
import { checkAdmin } from '../../helpers/user/UserHelper';
import { verifyToken } from '../../helpers/Token';
// Custom error
import { errorHandler } from '../../config/CustomError';

const router = express.Router();

router.get("/",verifyToken,checkAdmin,async (req,res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.post("/",verifyToken,checkAdmin,createUserValidator,async (req,res) => {
    try {
        const response = await createUser(req.body,Number(req.params.idToken));
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.put("/:id",verifyToken,checkAdmin,modifyUserValidator,async (req,res) => {
    try {
        const response = await updateUser(Number(req.params.id),req.body,Number(req.params.idToken));
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.delete("/:id",verifyToken,checkAdmin,async (req,res) => {
    try {
        const response = await deleteUser(Number(req.params.id),Number(req.params.idToken));
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

module.exports = router;
