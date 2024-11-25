const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postbodySchemas = require("./postbody-schemas");

/**
 * mongoDB schema for posts made on hobbi. see postbody-schemas for the schemas of what actually can be IN a post
 */
const hobbiPostSchema = new Schema({
    poster: Schema.Types.ObjectId,
    body: {
        type: [postbodySchemas.blockSchema],
        validate: [(val) => {
            return val.length <= 10
        }, '{PATH} exceeds 10 block limit']
    },
    bb: Schema.Types.ObjectId,
    meta: {
        stars: Number,
        comments: [{
            poster: Schema.Types.ObjectId,
            text: String
        }]
    }
}, {timestamps: true});

// Apply the discriminators
hobbiPostSchema.path('body').discriminator('text', postbodySchemas.textBlockSchema);
hobbiPostSchema.path('body').discriminator('image', postbodySchemas.imageBlockSchema);

module.exports = mongoose.model('posts', hobbiPostSchema);
