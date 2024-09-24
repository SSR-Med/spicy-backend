// Dependencies
import { Card } from "../../models/Card";
import { CardxUser } from "../../models/CardxUser";
import { User } from "../../models/User";
import { ItemxUser } from "../../models/ItemxUser"; // Import ItemxUser model
import { Item } from "../../models/Item"; // Import Item model
// Custom error
import { httpError } from "../../config/CustomError";
import { Sequelize, Op } from 'sequelize'; // Import Sequelize and Op

// Define constants for 'maggi' item and reward counts
const MAGGI_ITEM_ID = 1;
const COMMON_REWARD = 10;
const RARE_REWARD = 20;
const EPIC_REWARD = 40;

// Function to handle the card drawing process
export async function drawCards(userId: number, amount: number, featuredCharacterId: number) {
    // Fetch user information
    const user = await User.findOne({ where: { id: userId } });

    // Check if the user has enough tokens
    const tokenCost = amount === 1 ? 10 : 90; // Cost logic as needed
    if (user.tokens < tokenCost) throw new httpError("No tienes suficientes tokens", 400);

    // Deduct tokens from the user
    await user.update({ tokens: user.tokens - tokenCost });

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
                card = await Card.findOne({ where: { id: featuredCharacterId } });
            } else {
                // Fetch a random epic card that is NOT the featured character
                card = await Card.findOne({
                    where: { rarity: 0.2, id: { [Op.ne]: featuredCharacterId } },
                    order: Sequelize.literal('random()'),
                });
            }
        } else {
            // Fetch a random card based on the determined rarity
            card = await Card.findOne({
                where: { rarity: rarity },
                order: Sequelize.literal('random()'),
            });
        }

        if (card) {
            // Check if the user already owns this card
            const existingCard = await CardxUser.findOne({
                where: {
                    id_user: userId,
                    id_card: card.id,
                }
            });

            if (existingCard) {
                // User already owns this card, give 'maggi' items instead
                let maggiQuantity = getMaggiQuantity(card.rarity);

                // Check if user already has 'maggi' items
                let userMaggiItems = await ItemxUser.findOne({
                    where: {
                        id_user: userId,
                        id_item: MAGGI_ITEM_ID
                    }
                });

                if (userMaggiItems) {
                    // Update the quantity of existing maggi items
                    await userMaggiItems.update({
                        quantity: userMaggiItems.quantity + maggiQuantity
                    });
                } else {
                    // Add new entry for maggi items
                    await ItemxUser.create({
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
            } else {
                // Add the card to the user's inventory since they don't have it
                await CardxUser.create({
                    id_user: userId,
                    id_card: card.id,
                    level: 1,          // New cards start at level 1
                    xp: 0,             // Initial XP is 0
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
}

// Helper function to determine card rarity
function getRandomRarity() {
    const random = Math.random();
    if (random < 0.5) return 0.5; // Common
    if (random < 0.8) return 0.3; // Rare
    return 0.2; // Epic
}

// Helper function to get the number of 'maggi' items based on card rarity
function getMaggiQuantity(rarity: number): number {
    switch (rarity) {
        case 0.5: return COMMON_REWARD;
        case 0.3: return RARE_REWARD;
        case 0.2: return EPIC_REWARD;
        default: return 0;
    }
}