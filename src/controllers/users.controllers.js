/* eslint-disable import/extensions */
import UserService from '../services/users.services.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = parseInt(id, 10);
    const user = await UserService.getById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const postUser = async (req, res, next) => {
  try {
    // Obtenemos los datos que nos envia el cliente a través del body
    const {
      firstname,
      lastname,
      email,
      password,
    } = req.body;

    // Mandamos a llamar al servicio para insertar el usuario
    const user = await UserService.insert({
      firstname,
      lastname,
      email,
      password,
    });

    res.status(201).json(user);

    // Enviamos una respuesta 201 con el registro que acabamos de agregar a la DB
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = parseInt(id, 10);
    const user = await UserService.update(id, req.body);
    if (user[0] === 1) {
      return res.json({
        message: 'Se ha actualizado el registro en el sistema',
      });
    }
    return res.status(400).json({
      message: 'Hubo un problema al actualizar el registro',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = parseInt(id, 10);
    const result = await UserService.delete(id);
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
