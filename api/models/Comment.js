const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    datetime: {
        type: String,
        required: true,
    }
});

CommentSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
