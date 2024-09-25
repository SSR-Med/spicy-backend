// Dependencies
import express from 'express';
// Services
import { changePassword, getName, deleteSelf, register, getRole, checkAdmin,
    getResources, modifyResources
} from '../../services/user/UserService';
import { createToken } from '../../helpers/Token';
// Custom error
import { errorHandler } from '../../config/CustomError';
// Schemas
import { changePasswordValidator, validateRegister, modifyResourcesValidator } from '../../schemas/UserSchema';
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

router.get("/token", verifyToken, async (req,res) => {
    try{
        const token = createToken(Number(req.params.idToken));
        res.status(200).json({token});
    }catch(error){
        errorHandler(error,res);
    }
})

router.get("/admin", verifyToken, async (req,res) => {
    try{
        const response = await checkAdmin(Number(req.params.idToken));
        res.status(200).json({
            admin: response
        });
    }catch(error){
        errorHandler(error,res);
    }
})

router.get("/resources", verifyToken, async (req,res) => {
    try{
        const response = await getResources(Number(req.params.idToken));
        res.status(200).json(response);
    }catch(error){
        errorHandler(error,res);
    }
})

router.patch("/resources", verifyToken, modifyResourcesValidator, async (req,res) => {
    try{
        const response = await modifyResources(Number(req.params.idToken),req.body.energy,req.body.tokens);
        res.status(200).json(response);
    }catch(error){
        errorHandler(error,res);
    }
})

module.exports = router;