const { Router } = require('express');
const router = Router();
const { User, validateCreateUser } = require('../models/user');
const { Adress, validateCreateAdress } = require('../models/adress');

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

    //verify that mail and username dont exist
    //try catches

    const newAdress = await Adress.create(req.body.adress);
    req.body.user.adress_id = newAdress.id;

    const user = await User.create(req.body.user);
    
    res.send(user);
})


module.exports = router;