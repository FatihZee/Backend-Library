const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publishedDate: {
    type: DataTypes.DATE
  },
  pages: {
    type: DataTypes.INTEGER
  },
  image: {
    type: DataTypes.STRING  // Path to the image file
  }
}, {
  timestamps: true
});

module.exports = Book;
