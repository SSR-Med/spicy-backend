// Models
import {User} from "./User";
import { Item } from "./Item";
import { ItemxUser } from "./ItemxUser";
import { World } from "./World";
import { Mission } from "./Mission";
import { Card } from "./Card";
import { CardxUser } from "./CardxUser";
// Associations

User.hasMany(ItemxUser, {onDelete: 'cascade',foreignKey: 'id_user'});
ItemxUser.belongsTo(User, {foreignKey: 'id_user'});
Item.hasMany(ItemxUser, {onDelete:'cascade',foreignKey: 'id_item'});
ItemxUser.belongsTo(Item, {foreignKey: 'id_item'});
World.hasMany(Mission, {onDelete: 'cascade', foreignKey: 'worldId'});
Mission.belongsTo(World, {foreignKey: 'worldId'});
User.hasMany(CardxUser, {onDelete: 'cascade', foreignKey: 'id_user'});
CardxUser.belongsTo(User, {foreignKey: 'id_user'});
Card.hasMany(CardxUser, {onDelete: 'cascade', foreignKey: 'id_card'});
CardxUser.belongsTo(Card, {foreignKey: 'id_card'});