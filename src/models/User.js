/* eslint-disable no-unused-vars, no-sequences, func-names */

import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    redirect: DataTypes.STRING,
    status: DataTypes.STRING,
  });

  User.prototype.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.associate = (models) => {
    User.hasOne(models.Path, {
      as: 'Paths',
      foreignKey: 'userId',
    });

    User.hasMany(models.Session, {
      as: 'Sessions',
      foreignKey: 'userId',
    });

    User.hasMany(models.Questionnaire, {
      as: 'Questionnaires',
      foreignKey: 'id',
    });

    User.hasMany(models.Poll, {
      as: 'Polls',
      foreignKey: 'id',
    });
  };

  return User;
};
