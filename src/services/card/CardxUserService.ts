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
