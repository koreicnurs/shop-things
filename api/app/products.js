const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');
const auth = require("../middleware/auth");
const User = require("../models/User");
const Product = require("../models/Product");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', async (req, res) => {

    const query = {};

    if(req.query.category) {
        query.category = req.query.category;
    }

    if(req.query.user) {
        query.user = req.query.user;
    }

    try {
        const products = await Product
            .find(query)
            .populate('user category', 'username title');

        res.send(products);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('user category');

        if (!product) {
            res.status(404).send({message: 'Post not found!'});
        }

        res.send(product);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const token = req.get('Authorization');
    const {title, description, image, category, price} = req.body;
    const user = await User.findOne({token});

    if (!token) {
        return res.status(401).send({error: 'No token present!'});
    }

    if (!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }

    if (!title || !user || !description || !category || !price)  {
        return res.status(400).send({error: 'Data not valid'});
    }

    if (price < 0)  {
        return res.status(400).send({error: 'Write normal price'});
    }

    const productData = {
        title,
        user,
        description,
        image,
        category,
        price
    };

    if (req.file) {
        productData.image = 'uploads/' + req.file.filename;
    } else if (!image)  {
        return res.status(400).send({error: 'Data not valid'});
    }

    try {
        const product = new Product(productData);
        await product.save();

        res.send(product);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.delete('/:id', auth, async (req, res) => {
    const token = req.get('Authorization');
    const user = await User.findOne({token});
    const product = await Product.findOne({_id: req.params.id}).populate('user', 'username')

    if (!token) {
        return res.status(401).send({error: 'No token present!'});
    }

    if (!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }

    if(product.user.username === user.username) {
        try {
            await Product.deleteOne({_id: req.params.id});
            res.send({message: 'product deleted'});
        } catch (e) {
            res.sendStatus(500);
        }
    } else {
        return res.status(403).send({error: 'You not owner this product'});
    }

});

module.exports = router;