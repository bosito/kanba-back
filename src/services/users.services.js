/* eslint-disable import/extensions */
/* eslint-disable no-useless-catch */
import Models from '../models/init-models.js'; // Cargando todos los modelos del directorio /models

const { users } = Models();

export default class UserService {
  static async getAll() {
    try {
      const results = await users.findAll();
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await users.findByPk(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async insert(obj) {
    // Usar el método create del ORM sequelize
    try {
      const result = await users.create(obj);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, obj) {
    // Usar el método create del ORM sequelize
    try {
      const result = await users.update(obj, { where: { id } });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    // Usar el método create del ORM sequelize
    try {
      const result = await users.destroy({ where: { id } });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
