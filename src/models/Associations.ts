// Models
import {User} from "./User";
import { Item } from "./Item";
import { ItemxUser } from "./ItemxUser";
import { World } from "./World";
import { Mission } from "./Mission";
import { Enemy } from "./Enemy";
import { Card } from "./Card";
import { CardxUser } from "./CardxUser";
import { TeamCard} from "./TeamCard";
import { Casino } from "./Casino";
import { CasinoXCard } from "./CasinoXCard";
// Associations

User.hasMany(ItemxUser, {onDelete: 'cascade', foreignKey: 'id_user'});
ItemxUser.belongsTo(User, {foreignKey: 'id_user'});
Item.hasMany(ItemxUser, {onDelete:'cascade', foreignKey: 'id_item'});
ItemxUser.belongsTo(Item, {foreignKey: 'id_item'});
World.hasMany(Mission, {onDelete: 'cascade', foreignKey: 'worldId'});
Mission.belongsTo(World, {foreignKey: 'worldId'});
Card.hasMany(Enemy, {onDelete: 'cascade', foreignKey: 'cardId'});
Enemy.belongsTo(Card, {foreignKey: 'cardId'});
Mission.hasMany(Enemy, {onDelete: 'cascade', foreignKey: 'missionId'});
Enemy.belongsTo(Mission, {foreignKey: 'missionId'});
User.hasMany(CardxUser, {onDelete: 'cascade', foreignKey: 'id_user'});
CardxUser.belongsTo(User, {foreignKey: 'id_user'});
Card.hasMany(CardxUser, {onDelete: 'cascade', foreignKey: 'id_card'});
CardxUser.belongsTo(Card, {foreignKey: 'id_card'});
User.hasMany(TeamCard, {foreignKey: 'userId'});
TeamCard.belongsTo(User, {foreignKey: 'userId'});
CardxUser.hasMany(TeamCard, {foreignKey: 'userCardId'});
TeamCard.belongsTo(CardxUser, {foreignKey: 'userCardId'});
Casino.hasMany(CasinoXCard, {foreignKey: 'id_casino'});
CasinoXCard.belongsTo(Casino, {foreignKey: 'id_casino'});
Card.hasMany(CasinoXCard, {foreignKey: 'id_card'});
CasinoXCard.belongsTo(Card, {foreignKey: 'id_card'});