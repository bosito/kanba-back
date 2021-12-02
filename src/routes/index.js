/* eslint-disable import/extensions */
import { Router } from 'express';
import statusRouter from './status.routes.js';
import userRouter from './users.routes.js';
import subscriptionRouter from './subscription.routes.js';
import authRouter from './auth.routes.js';

const router = Router();

router.use(userRouter);
router.use(statusRouter);
router.use(subscriptionRouter);
router.use(authRouter);

export default router;
