import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({ //todo controller and endpoints for this
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    bbs: [Schema.Types.ObjectId],
    profileImage: {
        type: Schema.Types.ObjectId, // Reference to GridFS file ID
        ref: 'profilepics.files',       // Refers to the GridFS bucket
        required: false             // Allow profiles without images
    }
});

module.exports = mongoose.model('profile', ProfileSchema);
