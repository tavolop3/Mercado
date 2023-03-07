require('dotenv').config();
const config = require('config');
const { Sequelize } = require('sequelize');

//DB_PASS will be stored in .env file
const sequelize = new Sequelize(config.get('db'));

module.exports.init = async function(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports.sequelize = sequelize;