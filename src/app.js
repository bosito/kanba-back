/* eslint-disable import/extensions */
import express from 'express';
import userRoutes from './routes/users.routes.js';
import statusRoutes from './routes/status.routes.js';
import handleErrors from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(statusRoutes);
app.use(handleErrors);

export default app;
