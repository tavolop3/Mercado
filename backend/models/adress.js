const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Joi = require('joi');

const Adress = sequelize.define('Adress', 
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    country:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 20]
        }
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [2, 20]
        }
    },
    postal_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 20]
        }
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    house_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    floor: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    underscored: true
}
);

Adress.validate = function validate(adress) {
    const schema = Joi.object({
        country: Joi.string().min(2).max(20).required(),
        state: Joi.string().min(2).max(20).required(),
        postal_code: Joi.number().required(),
        city: Joi.string().min(2).max(20).required(),
        street: Joi.string().min(1).max(100),
        house_number: Joi.number().required(),
        floor: Joi.number(),
        description: Joi.string().required()
    })
    return schema.validate(adress);
}

exports.Adress = Adress;