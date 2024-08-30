// Models
import { User } from "../../models/User";
// Schema
import { createUserInterface, modifyUserInterface } from "../../schemas/UserSchema";
// Custom error
import { httpError } from "../../config/CustomError";
// Helpers
import { searchModel, compareSearchModel } from "../../helpers/SearchModel";
import { hashPassword } from "../../helpers/user/UserHelper";
import { capitalizeWords,deleteBlankSpaces } from "../../helpers/FormatString";

export async function getUsers(){
    const users = await User.findAll({
        order: [['id', 'ASC']],
    });
    users.forEach((user: typeof User) => {
        user.dataValues.password = '';
    });
    return users;
}

export async function createUser(createUserInterface:createUserInterface,userId:number){
    // Search for the user who wants to create the new user
    const userAdmin = await User.findOne({where:{id:userId}});
    // Change the user name
    createUserInterface.name = capitalizeWords(deleteBlankSpaces(createUserInterface.name));
    // Check if the user already exists
    if(!await searchModel(User,[{name: createUserInterface.name}])) throw new httpError('Este usuario ya existe',400);
    // Check permissions
    if(createUserInterface.role === 'superadmin') throw new httpError('No tienes permisos para crear un superadmin',400);
    if(userAdmin.role === 'admin' && createUserInterface.role === 'admin') throw new httpError('No tienes permisos para crear un admin',400);
    // Create the user
    await User.create({...createUserInterface, password:hashPassword(createUserInterface.password)});
    return {"message":"Usuario creado"};
}

export async function updateUser(id:number,modifyUserInterface:modifyUserInterface,userId: number){
    // Search for the user who wants to create the new user
    const userAdmin = await User.findOne({where:{id:userId}});
    // Change the user name
    modifyUserInterface.name = capitalizeWords(deleteBlankSpaces(modifyUserInterface.name));
    // Check if the user already exists
    if(!await compareSearchModel(User,[{name: modifyUserInterface.name}],id)) throw new httpError('Este usuario ya existe',400);
    const user = await User.findOne({where:{id:id}});
    // Check permissions
    if(userId != id){
        if(userAdmin.role === 'admin' && user.role != 'user') throw new httpError('No tienes permisos para modificar un admin',400);
        if(modifyUserInterface.role === 'superadmin') throw new httpError('No tienes permisos para modificar un superadmin',400);
        if(userAdmin.role === 'admin' && modifyUserInterface.role != 'user') throw new httpError('No tienes permisos para modificar un admin',400);
    }
    if(userId == id){
        if(userAdmin.role != modifyUserInterface.role) throw new httpError('No puedes modificar tu propio rol',400);
    }
    const updateData = modifyUserInterface.password != null ? {...modifyUserInterface, password: hashPassword(modifyUserInterface.password)} : {...modifyUserInterface,password: user.password};
    await user.update(updateData);
    return {"message":"Usuario modificado"};
}

export async function deleteUser(id:number,userId:number){
    // Search for the user who wants to create the new user
    const userAdmin = await User.findOne({where:{id:userId}});
    // Check if the user exists
    const user = await User.findOne({where:{id:id}});
    if(!user) throw new httpError('Este usuario no existe',400);
    // Check permissions
    if(userId === id) throw new httpError('No puedes eliminarte a ti mismo',400);
    if(userAdmin.role === 'admin' && user.role != 'user') throw new httpError('No tienes permisos para eliminar un admin',400);
    await user.destroy();
    return {"message":"Usuario eliminado"};
}
