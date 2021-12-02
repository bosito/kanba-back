/* eslint-disable import/extensions */
import { Router } from 'express';
import {
  getTasks,
  addTask,
  updateTask,
} from '../controllers/tasks.controllers.js';

const routes = Router();

// Obtener todas las tareas
routes.get('/tasks', getTasks);
routes.post('/tasks', addTask);
routes.put('/tasks/:id', updateTask);

export default routes;
