/* eslint-disable import/extensions */
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import multer from 'multer';
import cors from 'cors';
import userRoutes from './routes/users.routes.js';
import statusRoutes from './routes/status.routes.js';
import subsRoutes from './routes/subscription.routes.js';
import customerRoutes from './routes/customer.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import handleErrors from './middlewares/error.middleware.js';
import swaggerDocument from './swagger.json';
import sendEmail from './utils/nodemailer.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    // Date.now = unix timestamp
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalNameArr = file.originalname.split('.');
    const ext = originalNameArr[originalNameArr.length - 1];
    cb(null, `${originalNameArr[0]}-${uniqueSuffix}.${ext}`);
  },
});

const upload = multer({ storage });

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('uploads'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/upload-file', upload.single('file'), (req, res) => {
  res.json({
    message: 'El archivo ha sido subido satisfactoriamente',
  });
});

app.post('/send-email', async (req, res, next) => {
  try {
    const { subject, text, to } = req.body;
    const results = await sendEmail({ subject, text, to });
    res.json({ message: results });
  } catch (error) {
    next(error);
  }
});

app.use('/api/v1/', userRoutes);
app.use('/api/v1/', statusRoutes);
app.use('/api/v1/', subsRoutes);
app.use('/api/v1/', tasksRoutes);
app.use('/api/v1/', customerRoutes);
app.use(handleErrors);

export default app;
