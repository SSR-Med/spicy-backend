// Dependencies
import express from 'express';
// Services
import { changePassword, getName, deleteSelf, register, getRole} from '../../services/user/UserService';
// Custom error
import { errorHandler } from '../../config/CustomError';
// Schemas
import { changePasswordValidator, validateRegister } from '../../schemas/UserSchema';
// Helpers
import { verifyToken } from '../../helpers/Token';

const router = express.Router();

router.patch("/",verifyToken,changePasswordValidator,async (req,res) => {
    try {
        const response = await changePassword(Number(req.params.idToken),req.body.oldPassword,req.body.newPassword);
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error,res);
    }
})

router.delete("/",verifyToken,async (req,res) => {
    try{
        const response = await deleteSelf(Number(req.params.idToken));
        res.status(200).json(response);
    }catch(error){
        errorHandler(error,res);
    
    }
})

router.get("/name",verifyToken,async (req,res) => {
    try{
        const response = await getName(Number(req.params.idToken));
        res.status(200).json(response);
    }catch(error){
        errorHandler(error,res);
    }
})

router.get("/role", verifyToken, async (req,res) => {
    try{
        const response = await getRole(Number(req.params.idToken));
        res.status(200).json(response);
    }catch(error){
        errorHandler(error,res);
    }
})

router.post("/register",validateRegister,async (req,res) => {
    try{
        const response = await register(req.body);
        res.status(200).json(response);
    }catch(error){
        errorHandler(error,res);
    }
})


module.exports = router;