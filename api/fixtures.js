const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');


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
    }, {
        username: 'sergei',
        password: 'coolboy',
        token: nanoid(),
    }, {
        username: 'nursultan',
        password: 'supercoolboy',
        token: nanoid(),
    });

    const [ aPost, bPost, cPost ] = await Post.create({
        title: 'THE IDIOT',
        user: sergeiUser._id,
        datetime: new Date().toISOString(),
        description: 'Today even "nice girls" can be dangerous. This heiress, 16, assaulted three sailors',
        image: 'fixtures/first.jpg',
    }, {
        title: 'Grand Budapest Hotel',
        user: nursUser._id,
        datetime: new Date().toISOString(),
        description: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel\'s glorious years under an exceptional concierge.',
        image: 'fixtures/second.jpg',
    }, {
        title: 'Утешение',
        user: ksansaUser._id,
        datetime: new Date().toISOString(),
        description: '1894',
        image: 'fixtures/third.jpg',
    });

    await Comment.create({
       post: aPost._id,
       user: nursUser._id,
       text: 'A novel in Two Books',
       datetime:  new Date().toISOString(),
    },{
       post: bPost._id,
       user: ksansaUser._id,
       text: 'Уэс Андерсон снял фильм в трех различных соотношениях сторон: 1,33, 1,85 и 2,35:1, которые соответствуют трем разным отрезкам времени. Разные пропорции кадра подсказывают зрителям, какой временной период на экране.',
       datetime:  new Date().toISOString(),
    },{
       post: cPost._id,
       user: sergeiUser._id,
       text: 'Темнота и утешенье',
       datetime:  new Date().toISOString(),
    });



    await mongoose.connection.close();
};

run().catch(console.error);