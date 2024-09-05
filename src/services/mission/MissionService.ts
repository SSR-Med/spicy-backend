//Models
import { Mission } from "../../models/Mission";

export async function getMissionByWorld( worldId: number ){
    const missions = await Mission.findAll({
        where: {worldId: worldId},
        order: [['id', 'ASC']],
    });
    return missions;
}