/* eslint-disable import/extensions */
import { Router } from 'express';
import {
  getStatus, getStatusById, postStatus, updateStatus, deleteStatus,
} from '../controllers/status.controllers.js';

const routes = Router();

routes.get('/status', getStatus);

routes.get('/status/:id', getStatusById);

routes.post('/status', postStatus);

routes.put('/status/:id', updateStatus);

routes.delete('/status/:id', deleteStatus);

export default routes;
