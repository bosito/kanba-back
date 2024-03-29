import _sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Debes proporcionar el campo nombre',
            },
          },
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: 'users_email_key',
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isPassword(value) {
              if (value.length < 8) {
                const customError = new Error('La contraseña debe tener al menos 8 caracteres');
                customError.name = 'InvalidPassword';
                throw customError;
              }
            },
          },
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('now'),
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('now'),
        },
      },
      {
        hooks: {
          beforeCreate: (user) => {
            const hashPassword = bcrypt.hashSync(user.password, 8);
            user.password = hashPassword;
          },
        },
        sequelize,
        tableName: 'users',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'users_email_key',
            unique: true,
            fields: [{ name: 'email' }],
          },
          {
            name: 'users_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
    return users;
  }
}
