import { Router } from 'express';

// eslint-disable-next-line import/extensions
import { createSubscriptionCtrl } from '../controllers/subscription.controllers.js';

const routes = Router();

routes.post('/subscriptions', createSubscriptionCtrl);

export default routes;
