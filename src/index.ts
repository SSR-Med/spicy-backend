// Dependencies
import express from 'express';
const cors = require("cors");
// Constants
import {port} from "./config/Constants";
// Database
import {database} from "./config/Database";

const app = express();

// Middleware and json
app.use(express.json());
app.use(cors());

// Models
import {User} from "./models/User"
import {Card} from "./models/Card";
import { Item } from './models/Item';
import { ItemxUser } from './models/ItemxUser';
import { World } from './models/World';
import { Mission } from './models/Mission';
require("./models/Associations");

// Routes
app.use("/api/user", require("./routes/user/User"));
app.use("/api/login", require("./routes/user/Login"));
app.use("/api/admin",require("./routes/user/Admin"));
app.use("/api/card",require("./routes/card/Card"));
app.use("/api/item",require("./routes/item/Item"));
app.use("/api/user/item", require("./routes/item/ItemxUser"));
app.use("/api/world", require("./routes/world/WorldRoute"));

// Server running
database
  .authenticate()
  .then(() => {
    return database.sync({alter: true});
  })
  .then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
  })
  .catch((error: Error) => {
});