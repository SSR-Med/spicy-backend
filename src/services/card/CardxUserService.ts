//Dependencies
import { Sequelize } from "sequelize";

//Models
import { CardxUser } from "../../models/CardxUser";
import { Card } from "../../models/Card";
import { User } from "../../models/User";

//Custom error
import { httpError } from "../../config/CustomError";

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
    return cards;
}

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
// Función para subir de nivel una carta de usuario
export async function upgradeCardLevel(userId: number, cardUserId: number, xpAdded: number) {
    // Buscar la carta del usuario en CardxUser
    const cardxUser = await CardxUser.findOne({
        where: { id_user: userId, id: cardUserId },
        include: [
            {
                model: Card,
                attributes: ['name', 'xp_limit', 'attack', 'defense', 'evasion', 'health'] // Obtener atributos base de la carta
            }
        ]
    });

    if (!cardxUser) throw new httpError("Carta no encontrada", 404);

    const cardBase = cardxUser.card; // Obtener los atributos base de la carta
    let totalXp = cardxUser.xp + xpAdded; // Sumar la XP que se está suministrando
    let currentLevel = cardxUser.level;
    
    // Proceso de subida de nivel si la XP sobrepasa el límite
    while (totalXp >= cardBase.xp_limit) {
        totalXp -= cardBase.xp_limit; // Resto la XP para el siguiente nivel (overflow)
        currentLevel += 1; // Subir el nivel

        // Incrementar los atributos de la carta del usuario (puedes ajustar estos factores de incremento)
        cardxUser.attack += Math.floor(cardBase.attack * 0.1); // Incremento del 10%
        cardxUser.defense += Math.floor(cardBase.defense * 0.1);
        cardxUser.evasion += Math.floor(cardBase.evasion * 0.1);
        cardxUser.health += Math.floor(cardBase.health * 0.1);
    }

    // Actualizar la carta del usuario con la nueva XP, nivel, y atributos
    await cardxUser.update({
        xp: totalXp,           // XP actualizada después del overflow
        level: currentLevel,    // Nivel actualizado
        attack: cardxUser.attack,
        defense: cardxUser.defense,
        evasion: cardxUser.evasion,
        health: cardxUser.health
    });

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
