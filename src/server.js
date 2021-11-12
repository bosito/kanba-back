import dotenv from 'dotenv';
// eslint-disable-next-line import/extensions
import app from './app.js';

dotenv.config(); // Obteniendo las variables de entorno del proyecto

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // eslint-disable-next-line quotes
  console.log(`Servidor escuchando sobre el puerto ${PORT}`);
});
