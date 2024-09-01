// Models
import {User} from "./User";
import { Item } from "./Item";
import { ItemxUser } from "./ItemxUser";

// Associations

User.hasMany(ItemxUser, {onDelete: 'cascade',foreignKey: 'id_user'});
ItemxUser.belongsTo(User, {foreignKey: 'id_user'});
Item.hasMany(ItemxUser, {onDelete:'cascade',foreignKey: 'id_item'});
ItemxUser.belongsTo(Item, {foreignKey: 'id_item'});