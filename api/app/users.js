const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async(req, res) => {

    try {
        const {username, password, displayName, phone} = req.body;
        const userData = {username, password, displayName, phone};
        const user = new User(userData);

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/sessions', async(req, res) => {
    const { username, password} = req.body;

    const user = await User.findOne({username});

    if(!user) {
        return res.status(401).send({message: 'Credentials are wrong!'});
    }

    const isMatch = await user.checkPassword(password);

    if(!isMatch) {
        res.status(401).send({message: 'Credentials are wrong!'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});
    res.send({message: 'Username and password id correct!', user});
});


router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    return res.send({success, user});
});
module.exports = router;