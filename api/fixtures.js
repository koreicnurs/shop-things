const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Product = require("./models/Product");
const Category = require("./models/Category");


const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [ksansaUser, sergeiUser, nursUser] = await User.create({
        username: 'ksansa',
        password: 'lapkaqwerty',
        token: nanoid(),
        displayName: 'Olya',
        phone: '+996 123123'
    }, {
        username: 'sergei',
        password: 'coolboy',
        token: nanoid(),
        displayName: 'Sergei',
        phone: '+996 234234'
    }, {
        username: 'nursultan',
        password: '123',
        token: nanoid(),
        displayName: 'Nursultan',
        phone: '+996 555555'
    });

    const [comp, home, car] = await Category.create({
        title: 'Computers'
    }, {
        title: 'Home'
    }, {
        title: 'Car'
    });

    await Product.create({
        title: 'Comp',
        user: sergeiUser._id,
        category: comp._id,
        description: 'Computer for games',
        image: 'fixtures/comp.jpg',
        price: 50000,
    }, {
        title: 'sofa',
        user: nursUser._id,
        category: home._id,
        description: 'for one person',
        image: 'fixtures/second.jpg',
        price: 20000,
    }, {
        title: 'BMW',
        user: ksansaUser._id,
        category: car._id,
        description: '2000 year v6 4wd',
        image: 'fixtures/third.jpg',
        price: 100000,
    });

    await mongoose.connection.close();
};

run().catch(console.error);