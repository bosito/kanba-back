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

    // Mandamos a llamar al servicio para insertar el usuario

    // Enviamos una respuesta 201 con el registro que acabamos de agregar a la DB
  } catch (error) {
    next(error);
  }
};
