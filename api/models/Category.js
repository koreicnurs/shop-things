const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
});

CommentSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
const Category = mongoose.model('Comment', CategorySchema);

module.exports = Category;
