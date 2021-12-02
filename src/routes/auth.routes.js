/* eslint-disable import/extensions */
import { Router } from 'express';
import {
  loginCtrl,
} from '../controllers/auth.controllers.js';

const routes = Router();

routes.post('/auth/login', loginCtrl);

export default routes;
