const { Router } = require('express');
const router = Router();
const { User, validateCreateUser } = require('../models/user');
const { Adress, validateCreateAdress } = require('../models/adress');
const { Op } = require('sequelize');

router.get('/', async(req,res) => {
    const users = await User.findAll();
    
    res.send(users);
})

.post('/', async(req,res) => {
    //validate req.body, validate also that mail and username doesnt exists
    const { error } = validateCreateUser(req.body.user);
    if(error) return res.status(400).send(error.details[0].message);

    const { err } = validateCreateAdress(req.body.adress);
    if(err) return res.status(400).send(error.details[0].message);

    const existingUser = await User.findOne({ 
        where: { 
            [Op.or]: [{ email: req.body.user.email }, { username: req.body.user.username }]
        } 
    })
    if(existingUser) return res.status(409).send('Email or username already exists.');

    const newAdress = await Adress.create(req.body.adress);
    req.body.user.adress_id = newAdress.id;

    const user = await User.create(req.body.user);
    
    res.send(user);
})


module.exports = router;