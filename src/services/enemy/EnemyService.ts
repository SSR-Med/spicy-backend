//Models
import { Enemy } from "../../models/Enemy";

//Services
import { getCard } from "../card/CardService";

export async function getEnemiesByMission ( missionId: number) {
    let enemyCards: {name: string, health: number, attack: number, defense: number, evasion: number}[] = [];
    const enemies = await Enemy.findAll({
        where: {missionId: missionId},
        order: [['id', 'ASC']],
    });
    enemies.forEach(async (enemy: {id: number, cardId: number, missionId: number}) => {
        const card: {name: string, health: number, attack: number, defense: number, evasion: number} = await getCard(enemy.cardId);
        if (card) {
            console.log("Jueputa");
            enemyCards.push(card);
        }
    });
    return enemyCards;
}