const express = require('express')
const app = express()
const { port } = require('./config/Config')
const { sequelize } = require('./config/Database')
// Models
const Usuario = require('./models/Usuario')
const Carta = require('./models/Carta')
const Carta_Usuario = require('./models/Carta_Usuario')
const Mision = require('./models/Mision')
const Mision_Usuario = require('./models/Mision_Usuario')
const Casino = require('./models/Casino')
const Casino_Carta = require('./models/Casino_Carta')
const Enemigo = require('./models/Enemigo')
const Mundo = require('./models/Mundo')


// Routes
const userRouter = require('./routes/user/User')
// Using routes
app.use('/user', userRouter)


// Test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection success');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Sync models');
    app.listen(port, () => {
      console.log(`Server listen on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Connection fail', error);
  });