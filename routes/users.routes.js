const { Router } = require('express');
const router = Router();
const { User, validateCreateUser } = require('../models/user');

router.get('/', async(req,res) => {
    const users = await User.findAll();
    
    res.send(users);
})

.post('/', async(req,res) => {
    //validate req.body, validate also that mail and username doesnt exists
    const { error } = validateCreateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    req.body.adressId = 1;
    const user = await User.create(req.body);
    res.send(user);
})


module.exports = router;