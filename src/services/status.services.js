/* eslint-disable import/extensions */
/* eslint-disable no-useless-catch */
import Models from '../models/init-models.js'; // Cargando todos los modelos del directorio /models

const { status } = Models();

export default class StatuService {
  static async getAll() {
    try {
      const results = await status.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
      });
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await status.findByPk(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async insert(obj) {
    // Usar el método create del ORM sequelize
    try {
      const result = await status.create(obj);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getLastId() {
    try {
      const result = await status.max('id');
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, obj) {
    // Usar el método create del ORM sequelize
    try {
      // Obtenemos el after status del elemento que estamos moviendo
      const actualStatus = await this.getById(id);
      if (actualStatus.after_status === 0) {
        // Comprobar si el status se movió al final
        if (await this.getLastId() === obj.after_status) {
          const firstStatus = await status.findOne({ where: { after_status: id } });
          // Obtenemos el estatus que depende del estatus que estamos moviendo
          const firstStatusId = firstStatus.id;
          /* Actualizamos el status que depende del status
          que estamos moviendo y le asignamos el valor null */
          await status.update({ after_status: 0 }, { where: { id: firstStatusId } });
        } else {
          await status.update({ after_status: 0 }, { where: { id: obj.after_status } });
        }
        // Actualizar el primer elemento a nulo

        // Actualizar el status que iría después de nosotros

        // Actualizamos con el valor nulo
        // await status.update({ after_status: null }, { where: { id: obj.after_status } });
      }

      const result = await status.update(obj, { where: { id } });
      // return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    // Usar el método create del ORM sequelize
    try {
      const result = await status.destroy({ where: { id } });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
