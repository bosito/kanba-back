/* eslint-disable import/extensions */
import express from 'express';
import userRoutes from './routes/users.routes.js';
import statusRoutes from './routes/status.routes.js';

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(statusRoutes);

export default app;
