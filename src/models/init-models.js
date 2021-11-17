/* eslint-disable import/extensions */
import _sequelize from 'sequelize';
import _status from './status.js';
import _tasks from './tasks.js';
import _users from './users.js';
import config from '../config/config.js'; // Tomando los valores que me permiten conectarme a la DB del archivo config.js

const { DataTypes } = _sequelize;

export default function initModels() {
  const env = process.env.NODE_ENV || 'development'; // Tomar el ambiente en el que se encuentra el proyecto
  // Ambientes en los que puede estar el proyecto | development | test | production
  let sequelize; // Objeto sequelize con la cadena de conexión
  const configObj = config[env];
  // Le pasamos los valores de conexión al constructor Sequelize
  if (config.use_env_variable) {
    sequelize = new _sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new _sequelize(
      configObj.database,
      configObj.username,
      configObj.password,
      configObj,
    );
  }
  const status = _status.init(sequelize, DataTypes);
  const tasks = _tasks.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  tasks.belongsTo(status, { as: 'status', foreignKey: 'status_id' });
  status.hasMany(tasks, { as: 'tasks', foreignKey: 'status_id' });
  tasks.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
  users.hasMany(tasks, { as: 'tasks', foreignKey: 'user_id' });

  return {
    status,
    tasks,
    users,
  };
}
