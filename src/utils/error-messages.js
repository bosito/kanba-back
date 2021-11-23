export default {
  SequelizeValidationError: {
    status: 400,
    message: 'Error en validación (campo vacío)',
  },
  SequelizeUniqueConstraintError: {
    status: 400,
    message: 'Error al tratar de insertar un registro con un campo con un valor duplicado',
  },
  InvalidPassword: {
    status: 400,
    message: 'La contraseña debe tener al menos 8 caracteres',
  },
};
