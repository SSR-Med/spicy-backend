// Models
import {User} from "./User";
import { Item } from "./Item";
import { ItemxUser } from "./ItemxUser";
import { World } from "./World";
import { Mission } from "./Mission";

// Associations

User.hasMany(ItemxUser, {onDelete: 'cascade',foreignKey: 'id_user'});
ItemxUser.belongsTo(User, {foreignKey: 'id_user'});
Item.hasMany(ItemxUser, {onDelete:'cascade',foreignKey: 'id_item'});
ItemxUser.belongsTo(Item, {foreignKey: 'id_item'});
World.hasMany(Mission, {onDelete: 'cascade', foreignKey: 'worldId'});
Mission.belongsTo(World, {foreignKey: 'worldId'});