"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const gachaRoute = require('./routes/user/GachaRoute');
// Constants
const Constants_1 = require("./config/Constants");
// Database
const Database_1 = require("./config/Database");
const app = (0, express_1.default)();
// Middleware and json
app.use(express_1.default.json());
app.use(cors());
app.use("/gacha", gachaRoute);
require("./models/Associations");
// Routes
app.use("/api/user", require("./routes/user/User"));
app.use("/api/login", require("./routes/user/Login"));
app.use("/api/admin", require("./routes/user/Admin"));
app.use("/api/card", require("./routes/card/Card"));
app.use("/api/item", require("./routes/item/Item"));
app.use("/api/user/item", require("./routes/item/ItemxUser"));
app.use("/api/world", require("./routes/world/WorldRoute"));
app.use("/api/enemy", require("./routes/EnemyRoute/EnemyRoute"));
app.use("/api/cardxuser", require("./routes/card/CardxUserRoute"));
app.use("/api/teamcard", require("./routes/card/TeamCardRoute"));
app.use("/api/gacha", require("./routes/user/GachaRoute"));
// Server running
Database_1.database
    .authenticate()
    .then(() => {
    return Database_1.database.sync({ alter: true });
})
    .then(() => {
    app.listen(Constants_1.port, () => {
        console.log(`Server running on port ${Constants_1.port}`);
    });
})
    .catch((error) => {
});
