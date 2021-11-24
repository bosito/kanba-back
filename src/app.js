/* eslint-disable import/extensions */
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/users.routes.js';
import statusRoutes from './routes/status.routes.js';
import handleErrors from './middlewares/error.middleware.js';
import swaggerDocument from './swagger.json';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(userRoutes);
app.use(statusRoutes);
app.use(handleErrors);

export default app;
