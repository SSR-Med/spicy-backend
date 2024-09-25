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
exports.drawCards = drawCards;
// Dependencies
const Card_1 = require("../../models/Card");
const CardxUser_1 = require("../../models/CardxUser");
const User_1 = require("../../models/User");
const ItemxUser_1 = require("../../models/ItemxUser"); // Import ItemxUser model
// Custom error
const CustomError_1 = require("../../config/CustomError");
const sequelize_1 = require("sequelize"); // Import Sequelize and Op
// Define constants for 'maggi' item and reward counts
const MAGGI_ITEM_ID = 1;
const COMMON_REWARD = 10;
const RARE_REWARD = 20;
const EPIC_REWARD = 40;
// Function to handle the card drawing process
function drawCards(userId, amount, featuredCharacterId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Fetch user information
        const user = yield User_1.User.findOne({ where: { id: userId } });
        // Check if the user has enough tokens
        const tokenCost = amount === 1 ? 10 : 90; // Cost logic as needed
        if (user.tokens < tokenCost)
            throw new CustomError_1.httpError("No tienes suficientes tokens", 400);
        // Deduct tokens from the user
        yield user.update({ tokens: user.tokens - tokenCost });
        // Draw cards based on rarity probability
        const drawnResults = [];
        for (let i = 0; i < amount; i++) {
            let rarity = getRandomRarity(); // Determine rarity (0.5 = common, 0.3 = rare, 0.2 = epic)
            let card;
            // If the rarity is epic, determine if the card should be the featured character
            if (rarity === 0.2) {
                const isFeatured = Math.random() < 0.25; // 25% chance for the featured character
                if (isFeatured) {
                    // Fetch the featured character card
                    card = yield Card_1.Card.findOne({ where: { id: featuredCharacterId } });
                }
                else {
                    // Fetch a random epic card that is NOT the featured character
                    card = yield Card_1.Card.findOne({
                        where: { rarity: 0.2, id: { [sequelize_1.Op.ne]: featuredCharacterId } },
                        order: sequelize_1.Sequelize.literal('random()'),
                    });
                }
            }
            else {
                // Fetch a random card based on the determined rarity
                card = yield Card_1.Card.findOne({
                    where: { rarity: rarity },
                    order: sequelize_1.Sequelize.literal('random()'),
                });
            }
            if (card) {
                // Check if the user already owns this card
                const existingCard = yield CardxUser_1.CardxUser.findOne({
                    where: {
                        id_user: userId,
                        id_card: card.id,
                    }
                });
                if (existingCard) {
                    // User already owns this card, give 'maggi' items instead
                    let maggiQuantity = getMaggiQuantity(card.rarity);
                    // Check if user already has 'maggi' items
                    let userMaggiItems = yield ItemxUser_1.ItemxUser.findOne({
                        where: {
                            id_user: userId,
                            id_item: MAGGI_ITEM_ID
                        }
                    });
                    if (userMaggiItems) {
                        // Update the quantity of existing maggi items
                        yield userMaggiItems.update({
                            quantity: userMaggiItems.quantity + maggiQuantity
                        });
                    }
                    else {
                        // Add new entry for maggi items
                        yield ItemxUser_1.ItemxUser.create({
                            id_user: userId,
                            id_item: MAGGI_ITEM_ID,
                            quantity: maggiQuantity
                        });
                    }
                    // Log the result indicating the card was converted to maggi items
                    drawnResults.push({
                        message: `Ya tienes la carta "${card.name}". Recibiste ${maggiQuantity} caldos maggi en su lugar.`,
                        cardId: card.id,
                        cardName: card.name,
                        receivedMaggi: maggiQuantity
                    });
                }
                else {
                    // Add the card to the user's inventory since they don't have it
                    yield CardxUser_1.CardxUser.create({
                        id_user: userId,
                        id_card: card.id,
                        level: 1, // New cards start at level 1
                        xp: 0, // Initial XP is 0
                        attack: card.attack,
                        defense: card.defense,
                        evasion: card.evasion,
                        health: card.health,
                    });
                    // Log the successful card draw result
                    drawnResults.push({
                        message: `Has recibido la carta "${card.name}".`,
                        cardId: card.id,
                        cardName: card.name
                    });
                }
            }
        }
        return { message: `Has recibido ${amount} carta(s)`, results: drawnResults };
    });
}
// Helper function to determine card rarity
function getRandomRarity() {
    const random = Math.random();
    if (random < 0.5)
        return 0.5; // Common
    if (random < 0.8)
        return 0.3; // Rare
    return 0.2; // Epic
}
// Helper function to get the number of 'maggi' items based on card rarity
function getMaggiQuantity(rarity) {
    switch (rarity) {
        case 0.5: return COMMON_REWARD;
        case 0.3: return RARE_REWARD;
        case 0.2: return EPIC_REWARD;
        default: return 0;
    }
}
