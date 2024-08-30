// Dependencies
import express from 'express';
// Schemas
import { registerInterface, validateRegister} from "../../schemas/UserSchema";
// Custom error
import { errorHandler } from '../../config/CustomError';
// Services
import { login } from '../../services/user/UserService';

const router = express.Router();

router.post("/", validateRegister, async (req,res)=>{
    try{
        const token = await login(req.body.email,req.body.password);
        res.status(200).json({token});
    }catch(error:any){
        errorHandler(error,res);
    }
})

module.exports = router;