const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    mail:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [8,255]
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            len: [3, 10]
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adressId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}
);

module.exports = User;