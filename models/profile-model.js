const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({ //todo controller and endpoints for this
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        caseSensitive: false
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    bbs: [Schema.Types.ObjectId],
    profileImageLink: {
        type: String,
    }
});

module.exports = mongoose.model('profiles', ProfileSchema);
