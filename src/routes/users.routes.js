/* eslint-disable import/extensions */
import { Router } from 'express';
import {
  getUsers, getUserById, postUser, updateUser, deleteUser,
} from '../controllers/users.controllers.js';

const routes = Router();

// Obtener todos los usuarios
routes.get('/users', getUsers);
// Obtener un usuario por su id
routes.get('/users/:id', getUserById);
// Insertar un usuario
routes.post('/users', postUser);
// Actualizar un usuario
routes.put('/users/:id', updateUser);
// Borrar un usuario
routes.delete('/users/:id', deleteUser);

export default routes;
