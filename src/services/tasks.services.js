/* eslint-disable import/extensions */
/* eslint-disable no-useless-catch */
import Models from '../models/init-models.js'; // Cargando todos los modelos del directorio /models

const { tasks, users, status } = Models();

export default class TaskService {
  static async getAll() {
    try {
      const results = await tasks.findAll({
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        include: [
          {
            model: users,
            as: 'user',
            attributes: {
              exclude: ['created_at', 'updated_at', 'password', 'active'],
            },
            right: true,
          },
          {
            model: status,
            as: 'status',
            attributes: {
              exclude: ['created_at', 'updated_at'],
            },
          },
        ],
      });
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async add(taskObj) {
    try {
      const result = await tasks.create(taskObj);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
