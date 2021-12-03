import jwt from 'jsonwebtoken';

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization : false;

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      return res.json(decode);
    } catch (error) {
      next(error);
    }
  }
  return res.status(403).json({
    message: 'token no proporcionado',
  });
};

export default validateJWT;
