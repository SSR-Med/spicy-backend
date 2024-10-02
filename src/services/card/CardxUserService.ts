//CardxUserService.ts
//Dependencies
import { Sequelize } from "sequelize";
// Models
import { CardxUser } from "../../models/CardxUser";
import { Card } from "../../models/Card";
import { User } from "../../models/User";
// Custom error
import { httpError } from "../../config/CustomError";
import {deleteItemxUser} from "../item/ItemxUserService";
// Obtener todas las cartas de un usuario
export async function getCardsxUser(userId: number) {
    const cards = await CardxUser.findAll({
        where: { id_user: userId },
        include: [
            {
                model: Card,
                attributes: ['name']
            }
        ]
    });
    if (!cards) throw new httpError("No se encontraron cartas para el usuario", 404);
    return cards;
}

// Obtener una carta específica de un usuario
export async function getCardxUser(userCardId: number) {
    const card = await CardxUser.findOne({
        where: { id: userCardId },
        include: [
            {
                model: Card,
                attributes: ['name']
            }
        ]
    });
    if (!card) throw new httpError("Carta no encontrada", 404);
    return card;
}

// Subir de nivel una carta específica de un usuario
// Subir de nivel una carta específica de un usuario
export async function upgradeCardLevel(
    userId: number,
    cardUserId: string,
    xpAdded: number,
    usedMaggiItems: number[],
    usedRicostillaItems: number[]
) {
    // Validar xpAdded
    if (typeof xpAdded !== 'number' || isNaN(xpAdded)) {
        throw new httpError("xpAdded debe ser un número válido", 400);
    }
    const xp_limit = 20;
    const cardxUser = await CardxUser.findOne({
        where: { id_user: userId, id: cardUserId },
        include: [
            {
                model: Card,
                attributes: ['name', 'xp_limit', 'attack', 'defense', 'evasion', 'health']
            }
        ]
    });

    if (!cardxUser) throw new httpError("Carta no encontrada", 404);

    // Verificar que cardxUser.xp sea un número válido
    if (typeof cardxUser.xp !== 'number' || isNaN(cardxUser.xp)) {
        throw new httpError("El XP de la carta no es un número válido", 500);
    }

    //console.log("XP actual:", cardxUser.xp, "XP agregado:", xpAdded);
    const cardBase = cardxUser.card;
    let totalXp = cardxUser.xp + xpAdded;
    let currentLevel = cardxUser.level;

    while (totalXp >= xp_limit) {
        totalXp -= xp_limit;
        currentLevel += 1;
        cardxUser.attack += Math.floor(cardBase.attack * 0.1);
        cardxUser.defense += Math.floor(cardBase.defense * 0.1);
        cardxUser.evasion += Math.floor(cardBase.evasion * 0.1);
        cardxUser.health += Math.floor(cardBase.health * 0.1);
    }

    await cardxUser.update({
        xp: totalXp,
        level: currentLevel,
        attack: cardxUser.attack,
        defense: cardxUser.defense,
        evasion: cardxUser.evasion,
        health: cardxUser.health
    });

    // Aquí puedes agregar lógica para eliminar los ítems utilizados, si es necesario
    // Por ejemplo, podrías llamar a una función que maneje la eliminación de los 
    //console.log('Ítems utilizados:', itemIds);

    if (Array.isArray(usedMaggiItems)) {
        for (const itemId of usedMaggiItems) {
            try {
                await deleteItemxUser(userId, itemId);
                //console.log(`Ítem ${itemId} eliminado`);
            } catch (error) {
                console.error(`Error eliminando ítem ${itemId}:`, error);
            }
        }
    }
    if (Array.isArray(usedRicostillaItems)) {
        for (const itemId of usedRicostillaItems) {
            try {
                await deleteItemxUser(userId, itemId);
                //console.log(`Ítem ${itemId} eliminado`);
            } catch (error) {
                console.error(`Error eliminando ítem ${itemId}:`, error);
            }
        }
    }

    return {
        message: `Carta "${cardBase.name}" ha subido de nivel a ${currentLevel}`,
        level: currentLevel,
        remainingXp: totalXp,
        attack: cardxUser.attack,
        defense: cardxUser.defense,
        evasion: cardxUser.evasion,
        health: cardxUser.health
    };
}


