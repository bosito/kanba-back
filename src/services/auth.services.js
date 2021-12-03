/* eslint-disable import/extensions */
/* eslint-disable no-useless-catch */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Models from '../models/init-models.js'; // Cargando todos los modelos del directorio /models

const { users } = Models();

export default class AuthService {
  static async login(email, password) {
    try {
      const results = await users.findOne({ where: { email } });
      const validPassword = results ? bcrypt.compareSync(password, results.password) : false;
      let token = false;
      if (results && validPassword) {
        const user = {
          id: results.id,
          firstname: results.firstname,
          lastname: results.lastname,
          email: results.email,
        };
        // Comprobar que la contraseña coincida con la que envía el cliente -> Crear el token JWT
        token = this.signJWT(user);
      }
      return token;
    } catch (error) {
      throw error;
    }
  }

  static signJWT(userObj) {
    const token = jwt.sign(userObj, process.env.JWT_SECRET, {
      algorithm: 'HS384',
      expiresIn: '1h',
    });
    return token;
  }
}
