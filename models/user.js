const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Joi = require('joi').extend(require('@joi/date'));
const myCustomJoi = Joi.extend(require('joi-phone-number'));
const { Adress } = require('./adress');

const User = sequelize.define('User', {
    email:{
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
        allowNull: false,
        validate:{
            len: [5, 25]
        }
    },
    adress_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Adress,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 15]
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1,50]
        }
    },
    birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},
{
    underscored: true
}
);

User.validateCreate = (user) => {
    let maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);
    let minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 120);
    
    maxDate = maxDate.toISOString().slice(0,10);
    minDate = minDate.toISOString().slice(0,10);

    const schema = Joi.object({
        email: Joi.string().min(3).max(50).required().email(),
        password: Joi.string().min(8).max(255).required(),
        repeat_password: Joi.ref('password'),
        username: Joi.string().min(3).max(10).required(),
        phone: myCustomJoi.string().phoneNumber().required(),
        name: Joi.string().min(3).max(15).required(),
        last_name: Joi.string().min(3).max(50).required(),
        birth_date: Joi.date().format("YYYY-MM-DD").max(maxDate).min(minDate).required(),
    });
    return schema.validate(user);
}

User.validateLogin = function(user){
    const schema = Joi.object({
        password: Joi.string().min(8).max(255).required(),
        email: Joi.alternatives()
            .conditional('username', 
            { 
                is: Joi.exist(), 
                then: Joi.forbidden(), 
                otherwise: Joi.string().min(3).max(255).required() 
            }),
        username: Joi.alternatives()
            .conditional('email', 
            {
                is: Joi.exist(),
                then: Joi.forbidden(),
                otherwise: Joi.string().min(3).max(10).required() 
            })
    });
    return schema.validate(user);
}

module.exports.User = User;