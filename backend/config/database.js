const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('library', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error creating database:', err);
  });

module.exports = sequelize;
