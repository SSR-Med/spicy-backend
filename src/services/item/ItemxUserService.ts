// Dependencies
import { fn } from "sequelize";
import Sequelize from "sequelize";
// Models
import { ItemxUser } from "../../models/ItemxUser";
import { Item } from "../../models/Item";
// Custom error
import { httpError } from "../../config/CustomError";

export async function getQuantityItem4User(userId: number) {
    const items = await ItemxUser.findAll({
        where: { id_user: userId },
        group: ['id_item', 'item.name'],
        attributes: ['id_item', [fn('COUNT', 'id_item'), 'quantity'],
            [Sequelize.col('item.name'), 'item_name']
        ],
        include: [
            {
                model: Item,
                attributes: [],
                required: true
            }
        ]
    });

    // Create a new object to store the desired JSON structure
    const itemQuantityMap: { [key: string]: any } = {};

    // Iterate over the items and populate the map
    items.forEach((item: Record<string,any>) => {
        itemQuantityMap[item.dataValues.item_name] = {
            quantity: Number(item.dataValues.quantity),
            id: Number(item.dataValues.id_item)
        }
    });

    // Return the JSON object
    return itemQuantityMap;
}

export async function getItemxUser(){
    const items = await ItemxUser.findAll();
    return items
}

export async function createItemxUser(userId: number, itemId: number) {
    const item = await ItemxUser.create({ id_user: userId, id_item: itemId });
    return item
}

export async function deleteItemxUser(userId: number, itemId: number) {
    const item = await ItemxUser.findOne({ where: { id_user: userId, id_item: itemId } });
    if(!item) throw new httpError("Item no encontrado", 404);
    await item.destroy();
    return { message: "Item eliminado" };
}