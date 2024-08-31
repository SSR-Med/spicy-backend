// Models
import { Card } from "../../models/Card";
import { User } from "../../models/User";
// Custom error
import { httpError } from "../../config/CustomError";
// Helpers
import { capitalizeWords, deleteBlankSpaces } from "../../helpers/FormatString";
// Interfaces
import { cardInterface } from "../../schemas/CardSchema";

export async function createCard(card: cardInterface, userId:number) {
    // Search for the user who wants to create the new card
    const user = await User.findOne({ where: { id: userId } });
    // Check permissions
    if (user.role === "user") throw new httpError("No tienes permisos para crear una carta", 401);

    // Change the card name
    card.name = capitalizeWords(deleteBlankSpaces(card.name));
    // Check if the card already exists
    const searchCard = await Card.findOne({ where: { name: card.name } });
    if (searchCard) throw new httpError("Carta ya existente", 400);
    // Create the card
    await Card.create(card);
    return { message: "Carta creada" };
}

export async function deleteCard(cardId: number, userId: number) {
    // Search for the user who wants to create the new card
    const user = await User.findOne({ where: { id: userId } });
    // Check permissions
    if (user.role === "user") throw new httpError("No tienes permisos para borrar una carta", 401);
    // Search for the card
    const card = await Card.findOne({ where: { id: cardId } });
    if (!card) throw new httpError("Carta no encontrada", 404);
    await card.destroy();
    return { message: "Carta eliminada" };
}

export async function getCards() {
    const cards = await Card.findAll({
        order: [["id", "ASC"]],
    });
    return cards;
}

export async function getCard(cardId: number) {
    const card = await Card.findOne({ where: { id: cardId } });
    if (!card) throw new httpError("Carta no encontrada", 404);
    return card;
}


export async function updateCard(cardId: number, card: cardInterface, userId: number) {
    // Search for the user who wants to create the new card
    const user = await User.findOne({ where: { id: userId } });
    // Check permissions
    if (user.role === "user") throw new httpError("No tienes permisos para modificar una carta", 401);
    
    // Search for the card
    const searchCard = await Card.findOne({ where: { id: cardId } });
    if (!searchCard) throw new httpError("Carta no encontrada", 404);

    // Change the card name
    card.name = capitalizeWords(deleteBlankSpaces(card.name));
    
    // Check if the card already exists
    if (searchCard.name !== card.name) {
        const searchCard = await Card.findOne({ where: { name: card.name } });
        if (searchCard) throw new httpError("Carta ya existente", 400);
    }
    await searchCard.update(card);
    return { message: "Carta modificada" };
}