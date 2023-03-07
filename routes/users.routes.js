const { Router } = require('express');
const router = Router();
const User = require('../models/user');

router.get('/', async(req,res) => {
    const users = await User.findAll();
    
    res.send(users);
})

.post('/', async(req,res,next) => {
    //validate req.body
    const user = await User.create(req.body);
    res.send(user);
})


module.exports = router;