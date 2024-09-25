"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem = createItem;
exports.deleteItem = deleteItem;
exports.getItems = getItems;
exports.getItem = getItem;
exports.updateItem = updateItem;
// Models
const Item_1 = require("../../models/Item");
// Custom error
const CustomError_1 = require("../../config/CustomError");
function createItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if the item already exists
        const searchItem = yield Item_1.Item.findOne({ where: { name: item.name } });
        if (searchItem)
            throw new CustomError_1.httpError("Item ya existía", 400);
        // Create the item
        yield Item_1.Item.create(item);
        return { message: "Item creado" };
    });
}
function deleteItem(itemId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the item
        const item = yield Item_1.Item.findOne({ where: { id: itemId } });
        if (!item)
            throw new CustomError_1.httpError("Item no se encontró", 404);
        yield item.destroy();
        return { message: "Item eliminado" };
    });
}
function getItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield Item_1.Item.findAll({
            order: [["id", "ASC"]],
        });
        return items;
    });
}
function getItem(itemId) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield Item_1.Item.findOne({ where: { id: itemId } });
        if (!item)
            throw new CustomError_1.httpError("Item no encontrado", 404);
        return item;
    });
}
function updateItem(itemId, item) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the item
        const searchItem = yield Item_1.Item.findOne({ where: { id: itemId } });
        if (!searchItem)
            throw new CustomError_1.httpError("Item no encontrado", 404);
        // Update the item
        yield searchItem.update(item);
        return { message: "Item actualizado" };
    });
}
