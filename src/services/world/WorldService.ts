// Models
import { World } from "../../models/World";

export async function getWorlds(){
    const worlds = await World.findAll({
        order: [['id', 'ASC']],
    });
    return worlds;
}