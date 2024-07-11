const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sesuaikan dengan konfigurasi database Anda

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noTelp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = User;
