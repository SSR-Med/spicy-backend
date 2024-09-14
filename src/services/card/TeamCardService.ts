//Dependencies
import { Sequelize } from "sequelize";

//Models
import { CardxUser } from "../../models/CardxUser";
import { TeamCard } from "../../models/TeamCard";

//Custom error
import { httpError } from "../../config/CustomError";
import { Card } from "../../models/Card";
import { teamCardInterface } from "../../schemas/TeamCardSchema";

export async function getTeamCardsByUser(userId: number) {
    const teamCards = await TeamCard.findAll({
        where: { userId: userId },
        include: [
            {
                model: CardxUser,
                attributes: ['id', 'attack', 'defense', 'evasion', 'health' ],
                include: [
                    {
                        model: Card,
                        attributes: ['name']
                    }
                ]
            },
        ]
    });
    return teamCards;
}

export async function createTeamCard(teamCard: teamCardInterface) {
    const searchTeamCard = await TeamCard.findOne({ where: {userId: teamCard.userId, userCardId: teamCard.userCardId }});
    if (searchTeamCard) return;
    await TeamCard.create(teamCard);
    return { message: "Carta agregada al equipo del usuario" };
}

export async function deleteTeamcard(teamCardId: number) {
    const teamCard = await TeamCard.findOne({ where: {id: teamCardId}});
    if (!teamCard) throw new httpError("Carta no encontrada", 404);
    await teamCard.destroy();
    return {message: "Carta eliminada del equipo del usuario" };
}