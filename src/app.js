/* eslint-disable import/extensions */
import express from 'express';
import Sequelize from 'sequelize';
import initModels from './models/init-models.js'; // Cargando todos los modelos del directorio /models
import config from './config/config.js'; // Tomando los valores que me permiten conectarme a la DB del archivo config.js

const env = process.env.NODE_ENV || 'development'; // Tomar el ambiente en el que se encuentra el proyecto
// Ambientes en los que puede estar el proyecto | development | test | production

let sequelize; // Objeto sequelize con la cadena de conexión

const configObj = config[env];

// Le pasamos los valores de conexión al constructor Sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(configObj.database, configObj.username, configObj.password, configObj); 
}

// Importamos el módelo users
const { users } = initModels(sequelize);

const app = express();

app.get('/users', async (req, res) => {
  // Seleccionamos todos los registros y todas las columnas de la tabla users
  const results = await users.findAll();
  res.json(results);
});

export default app;
