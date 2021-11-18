/* eslint-disable import/extensions */
/* eslint-disable no-useless-catch */
import { Sequelize } from 'sequelize';
import Models from '../models/init-models.js'; // Cargando todos los modelos del directorio /models

const { status } = Models();
const Op = Sequelize.Op;

export default class StatuService {
  static async getAll() {
    try {
      const results = await status.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
      });
      return JSON.parse(JSON.stringify(results));
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

  static async getLastStatus() {
    try {
      const statusIds = await (await this.getAll()).map((s) => s.after_status);
      const result = await status.findOne({
        where: {
          id: {
            [Op.notIn]: statusIds,
          },
        },
      });
      return JSON.parse(JSON.stringify(result));
    } catch (error) {
      throw error;
    }
  }

  static async getNextStatus(id) {
    try {
      const result = await status.findOne({
        where: {
          after_status: id
        }
      });

      console.log(result);
      return JSON.parse(JSON.stringify(result));
    } catch (error) {
      throw error;
    }
  }

  static async update(id, obj) {
    let result;
    // Usar el método create del ORM sequelize
    try {
      // Obtenemos el after status del elemento que estamos moviendo
      const statusA = await this.getById(id);
      // Comprobar si el estatusA es el que está en primer lugar ->
      if (statusA.after_status === 0) {
        // Comprobar si el estatusA se va a mover al final
        const lastStatus = await this.getLastStatus();
        const nextStatus = await this.getNextStatus(id);
        // Cuando se mueve al último lugar
        if (obj.after_status === lastStatus.id) {
          // Actualizaremos el elemento que dependía de mi estatus para que sea el primer lugar
          await status.update({ after_status: 0 }, { where: { id: nextStatus.id } });
          // Actualizar el status que estamos moviendo
          result = await status.update(obj, { where: { id } });
        } else if (obj.after_status === nextStatus.id) {
          /* Actualizaremos el siguiente elemento (status) con 
          * statusB.after_status = 0 y statusA.after_status = statusB.id
          * statusC.after_status = statusA.id
          */
          // [statusA, statusB, statusC] -> [4, 2, 5] -> [2, 4, 5]
          console.log('Se está moviendo a la derecha');
        } else {
          console.log('Se está moviendo a otro lugar');
        }
        // Comprobar si el estatusA se va a mover a la derecha (statusB)
        // si se moverá a otro sitio
      } else {
        // Se está moviendo otro elemento
      }

      // const result = await status.update(obj, { where: { id } });
      return result;
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
