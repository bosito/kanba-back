/* eslint-disable import/extensions */
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import multer from 'multer';
import userRoutes from './routes/users.routes.js';
import statusRoutes from './routes/status.routes.js';
import handleErrors from './middlewares/error.middleware.js';
import swaggerDocument from './swagger.json';

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static('uploads'));

app.post('/upload-file', upload.single('file'), (req, res, next) => {
  const file = req.file.path;
  //DB
  res.json({
    message: 'El archivo ha sido subido satisfactoriamente',
  });
});

app.use(express.json());
app.use(userRoutes);
app.use(statusRoutes);
app.use(handleErrors);

export default app;
