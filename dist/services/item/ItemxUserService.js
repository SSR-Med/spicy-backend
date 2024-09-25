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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuantityItem4User = getQuantityItem4User;
exports.getItemxUser = getItemxUser;
exports.createItemxUser = createItemxUser;
exports.deleteItemxUser = deleteItemxUser;
// Dependencies
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("sequelize"));
// Models
const ItemxUser_1 = require("../../models/ItemxUser");
const Item_1 = require("../../models/Item");
// Custom error
const CustomError_1 = require("../../config/CustomError");
function getQuantityItem4User(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield ItemxUser_1.ItemxUser.findAll({
            where: { id_user: userId },
            group: ['id_item', 'item.name'],
            attributes: ['id_item', [(0, sequelize_1.fn)('COUNT', 'id_item'), 'quantity'],
                [sequelize_2.default.col('item.name'), 'item_name']
            ],
            include: [
                {
                    model: Item_1.Item,
                    attributes: [],
                    required: true
                }
            ]
        });
        // Create a new object to store the desired JSON structure
        const itemQuantityMap = {};
        // Iterate over the items and populate the map
        items.forEach((item) => {
            itemQuantityMap[item.dataValues.item_name] = {
                quantity: Number(item.dataValues.quantity),
                id: Number(item.dataValues.id_item)
            };
        });
        // Return the JSON object
        return itemQuantityMap;
    });
}
function getItemxUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield ItemxUser_1.ItemxUser.findAll();
        return items;
    });
}
function createItemxUser(userId, itemId) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield ItemxUser_1.ItemxUser.create({ id_user: userId, id_item: itemId });
        return item;
    });
}
function deleteItemxUser(userId, itemId) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield ItemxUser_1.ItemxUser.findOne({ where: { id_user: userId, id_item: itemId } });
        if (!item)
            throw new CustomError_1.httpError("Item no encontrado", 404);
        yield item.destroy();
        return { message: "Item eliminado" };
    });
}
