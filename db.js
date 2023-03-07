require('dotenv').config();
const config = require('config');
const { Sequelize } = require('sequelize');

//DB_PASS will be stored in .env file
const sequelize = new Sequelize(config.get('db'));

module.exports = sequelize;