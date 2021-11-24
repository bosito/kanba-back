/* eslint-disable import/extensions */
/* eslint-disable no-useless-catch */
import { Sequelize } from 'sequelize';
import Models from '../models/init-models.js'; // Cargando todos los modelos del directorio /models

const { status } = Models();
const { Op } = Sequelize;

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

  static async getFirstStatus() {
    try {
      const result = await status.findOne({
        where: {
          after_status: 0,
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
          after_status: id,
        },
      });
      return JSON.parse(JSON.stringify(result));
    } catch (error) {
      throw error;
    }
  }

  static async update(id, obj) {
    // Usar el método create del ORM sequelize
    try {
      // let statusA = await this.getById(id);
      // let statusB = await this.getNextStatus(id);
      // let statusC = await this.getNextStatus(statusB.id);
      const lastStatus = await this.getLastStatus();

      // if (
      //   (statusA.after_status === 0 && obj.after_status === statusB.id)
      //   || obj.after_status === 0) {
      //   // El primer elemento de la lista de status y se está moviendo a su estatus más proximo
      //   await status.update({ after_status: 0 }, { where: { id: statusB.id } });
      //   await status.update({ after_status: statusB.id }, { where: { id: statusA.id } });
      //   await status.update({ after_status: statusA.id }, { where: { id: statusC.id } });
      // } else if (statusA.after_status === 0 && obj.after_status !== lastStatus.id) {
      //   const statusD = await this.getNextStatus(statusC.id);
      //   await status.update({ after_status: 0 }, { where: { id: statusB.id } });
      //   await status.update({ after_status: obj.after_status }, { where: { id: statusA.id } });
      //   await status.update({ after_status: statusA.id }, { where: { id: statusD.id } });
      // } else if (statusA.after_status === 0 && obj.after_status === lastStatus.id) {
      //   await status.update({ after_status: 0 }, { where: { id: statusB.id } });
      //   await status.update({ after_status: obj.after_status }, { where: { id: statusA.id } });
      // } else if (statusA.after_status !== 0 && obj.after_status !== lastStatus.id) {
      //   statusB = await this.getById(id);
      //   statusA = await this.getById(statusB.after_status);
      //   statusC = await this.getById(obj.after_status);
      //   const statusD = await this.getNextStatus(statusC.id);
      //   await status.update({ after_status: statusA.id }, { where: { id: statusC.id } });
      //   await status.update({ after_status: obj.after_status }, { where: { id: statusB.id } });
      //   await status.update({ after_status: statusB.id }, { where: { id: statusD.id } });
      // } else if (statusA.after_status !== 0 && obj.after_status === lastStatus.id) {
      //   await status.update({ after_status: statusA.id }, { where: { id: statusC.id } });
      //   await status.update({ after_status: obj.after_status }, { where: { id } });
      // }
      // return true;
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
