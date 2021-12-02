/* eslint-disable import/extensions */
import AuthService from '../services/auth.services.js';

export const loginCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await AuthService.login(email, password);
    if(response){
      // Para guardar el token en una cookie con una expiración de 1 día
      res.cookie('jwt_token', response, { expires: new Date(Date.now() + (24*60*60)) }); 
      return res.json({token: response});
    }
    return res.status(403).json({ message: 'Correo electronico o contraseña incorrectos' });
  } catch (error) {
    next(error);
  }
};
