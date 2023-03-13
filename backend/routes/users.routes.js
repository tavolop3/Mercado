const { Router } = require('express');
const router = Router();
const { User } = require('../models/user');
const { Adress } = require('../models/adress');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth = require('../middlewares/auth');

router.post('/registration', async(req,res) => {
    console.log(req.body);
    const { error } = User.validateCreate(req.body.user);
    if(error) return res.status(400).send(error.details[0].message);

    const { err } = Adress.validate(req.body.adress);
    if(err) return res.status(400).send(error.details[0].message);

    const existingUser = await User.findOne({ 
        where: { 
            [Op.or]: [{ email: req.body.user.email }, { username: req.body.user.username }]
        } 
    })
    if(existingUser) return res.status(409).send('Email or username already exists.');

    const newAdress = await Adress.create(req.body.adress);
    req.body.user.adress_id = newAdress.id;

    const salt = await bcrypt.genSalt(10);
    req.body.user.password = await bcrypt.hash(req.body.user.password, salt);
    const user = await User.create(req.body.user);

    res.send(_.pick(user, ['email','username']));
})

.post('/login', async(req,res) => {
    const { error } = User.validateLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = req.body.email
        ? await User.findOne({ where: { email: req.body.email }})
        : await User.findOne({ where: { username: req.body.username }});
    if(!user) return res.status(400).send('Invalid email/username or password.');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid email/username or password');

    const token = user.generateAuthToken();

    res.json({'x-auth-token': token});
})

.get('/',async(req,res) => {
    const users = await User.findAll();

    res.send(users)
})

module.exports = router;