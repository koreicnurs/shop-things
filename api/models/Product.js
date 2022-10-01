const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
});

const Product = mongoose.model('Product', PostSchema);

module.exports = Product;