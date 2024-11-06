const bcrypt = require('bcrypt');
const { hashPassword } = require('../utils/passwordUtils');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('user', 'admin', 'moderator'),
        defaultValue: 'user',
      },
      profilePicture: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      underscored: true,
      hooks: {
        beforeCreate: async (user) => {
          user.password = await hashPassword(user.password);
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            user.password = await hashPassword(user.password);
          }
        },
      },
      getterMethods: {
        name() {
          return `${this.firstName} ${this.lastName}`.trim();
        },
      },
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Guide, { foreignKey: 'author_id' });
    User.hasMany(models.Comment, { foreignKey: 'user_id' });
    User.hasMany(models.Rating, { foreignKey: 'user_id' });
  };

  return User;
};