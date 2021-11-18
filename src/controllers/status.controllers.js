/* eslint-disable import/extensions */
import StatuService from '../services/status.services.js';

export const getStatus = async (req, res, next) => {
  try {
    const users = await StatuService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getStatusById = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = parseInt(id, 10);
    const user = await StatuService.getById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const postStatus = async (req, res, next) => {
  try {
    // Obtenemos los datos que nos envia el cliente a través del body
    const {
      name,
    } = req.body;

    // Obtener el último estatus insertado en la tabla
    const lastId = await StatuService.getLastId();

    // Mandamos a llamar al servicio para insertar el estatus
    const user = await StatuService.insert({
      name,
      after_status: lastId,
    });

    res.status(201).json(user);

    // Enviamos una respuesta 201 con el registro que acabamos de agregar a la DB
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = parseInt(id, 10);
    const status = await StatuService.update(id, req.body);
    // if (user[0] === 1) {
    //   return res.json({
    //     message: 'Se ha actualizado el registro en el sistema',
    //   });
    // }
    // return res.status(400).json({
    //   message: 'Hubo un problema al actualizar el registro',
    // });
  } catch (error) {
    next(error);
  }
};

export const deleteStatus = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = parseInt(id, 10);
    const result = await StatuService.delete(id);
    if (result === 1) {
      return res.json({
        message: 'Se ha eliminado el registro en el sistema',
      });
    }
    return res.status(400).json({
      message: 'Hubo un problema al eliminar el registro',
    });
  } catch (error) {
    next(error);
  }
};
