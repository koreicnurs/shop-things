const express = require('express');

const router = express.Router();
const config = require('../config');

const Category = require('../models/Category');

router.get('/', async (req, res) => {
    try {
        const categories = await Category
            .find()

        res.send(categories);
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;