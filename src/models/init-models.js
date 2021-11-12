/* eslint-disable import/extensions */
import _sequelize from 'sequelize';
import _status from './status.js';
import _tasks from './tasks.js';
import _users from './users.js';

const { DataTypes } = _sequelize;

export default function initModels(sequelize) {
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
