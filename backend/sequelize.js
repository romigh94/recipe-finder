const { Sequelize } = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root', 
  password: process.env.DB_PASSWORD, 
  database: 'mysql', 
});

module.exports = sequelize;