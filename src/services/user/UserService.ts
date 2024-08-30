// Dependencies
const jwt = require("jsonwebtoken");
// Models
import { User } from "../../models/User";
// Custom error
import { httpError } from "../../config/CustomError";
// Helpers
import { comparePassword, hashPassword } from "../../helpers/user/UserHelper";
import { capitalizeWords,deleteBlankSpaces } from "../../helpers/FormatString";
// Env variables
import { jwt_key, jwt_expires_in } from "../../config/Constants";
// Schemas
import { registerInterface } from "../../schemas/UserSchema";

export async function login(name:string,password:string){
    name = capitalizeWords(deleteBlankSpaces(name));
    const searchUser = await User.findOne({where:{name:name}});
    if(!searchUser){
        throw new httpError("Credenciales invalidas",404);
    }
    const compare = await comparePassword(password,searchUser.password);
    if(!compare){
        throw new httpError("Credenciales invalidas",400);
    }
    const id = searchUser.id;
    const token = jwt.sign({ id }, jwt_key, { expiresIn: jwt_expires_in });
    return token;
}

export async function changePassword(id:number, oldPassword:string, newPassword:string){
    const user = await User.findOne({where:{id:id}});
    if(!user) throw new httpError("Usuario no encontrado",404);
    if(!comparePassword(oldPassword,user.password)) throw new httpError("Credenciales incorrectas",400)
    await user.update({password:hashPassword(newPassword)});
    return {message:"Contraseña actualizada"};
}

export async function getName(id:number){
    const user = await User.findOne({where:{id:id}});
    if(!user) throw new httpError("Usuario no encontrado",404);
    return {name:user.name};
}  

export async function deleteSelf(id:number){
    const user = await User.findOne({where:{id:id}});
    if(!user) throw new httpError("Usuario no encontrado",404);
    await user.destroy();
}

export async function getRole(id:number){
    const user = await User.findOne({where:{id:id}});
    if(!user) throw new httpError("Usuario no encontrado",404);
    return {role:user.role};
}

export async function register(registerInterface:registerInterface){
    // Change the user name
    registerInterface.name = capitalizeWords(deleteBlankSpaces(registerInterface.name));
    // Check if the user already exists
    const searchUser = await User.findOne({where:{name: registerInterface.name}});
    if(searchUser) throw new httpError('Este usuario ya existe',400);
    // Create the user
    await User.create({...registerInterface, password:hashPassword(registerInterface.password)});
    return {"message":"Usuario creado"};
}