/* eslint-disable import/extensions */
import { Router } from 'express';
import {
  getTasks,
} from '../controllers/tasks.controllers.js';

const routes = Router();

// Obtener todas las tareas
routes.get('/tasks', getTasks);

export default routes;
