const { Router } = require('express');
const router = Router();
const { User, validate } = require('../models/user');

router.get('/', async(req,res) => {
    const users = await User.findAll();
    
    res.send(users);
})

.post('/', async(req,res,next) => {
    //validate req.body, validate also that mail and username doesnt exists

    const user = await User.create(req.body);
    res.send(user);
})


module.exports = router;