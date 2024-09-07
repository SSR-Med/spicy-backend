//Models
import { Enemy } from "../../models/Enemy";
import { Card } from "../../models/Card";


export async function getEnemiesByMission ( missionId: number) {
    const enemyCards = await Enemy.findAll({
        where: {missionId: missionId},
        include: [
            {
                model: Card,
                attributes: ['name', 'health', 'attack', 'defense', 'evasion']
            }
        ]
    })
    return enemyCards;
}