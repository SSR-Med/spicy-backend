// Models
import { Item } from "../../models/Item";
// Custom error
import { httpError } from "../../config/CustomError";
// Interfaces
import { itemInterface } from "../../schemas/ItemSchema";

export async function createItem(item: itemInterface) {
    // Check if the item already exists
    const searchItem = await Item.findOne({ where: { name: item.name } });
    if (searchItem) throw new httpError("Item ya existía", 400);
    // Create the item
    await Item.create(item);
    return { message: "Item creado" };
}

export async function deleteItem(itemId: number) {
    // Search for the item
    const item = await Item.findOne({ where: { id: itemId } });
    if (!item) throw new httpError("Item no se encontró", 404);
    await item.destroy();
    return { message: "Item eliminado" };
}

export async function getItems() {
    const items = await Item.findAll({
        order: [["id", "ASC"]],
    });
    return items;
}

export async function getItem(itemId: number) {
    const item = await Item.findOne({ where: { id: itemId } });
    if (!item) throw new httpError("Item no encontrado", 404);
    return item;
}

export async function updateItem(itemId: number, item: itemInterface) {
    // Search for the item
    const searchItem = await Item.findOne({ where: { id: itemId } });
    if (!searchItem) throw new httpError("Item no encontrado", 404);
    // Update the item
    await searchItem.update(item);
    return { message: "Item actualizado" };
}