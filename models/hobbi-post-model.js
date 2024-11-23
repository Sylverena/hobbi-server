import mongoose from "mongoose";
const Schema = mongoose.Schema;
const postbodySchemas = import("./postbody-schemas");

/**
 * mongoDB schema for posts made on hobbi. see postbody-schemas for the schemas of what actually can be IN a post
 */
const hobbiPostSchema = new Schema({
    poster: Schema.Types.ObjectId,
    body: {
        type: [postbodySchemas.blockSchema],
        required: true,
        validate: [(val) => {return val.length <= 10}, '{PATH} exceeds 10 block limit']
    },
    meta: {
        required: true,
        stars: Number,
        comments: {
            type: [Schema.Types.ObjectId]
        }
    }
}, {timestamps: true});

// Apply the discriminators
hobbiPostSchema.path('body').discriminator('text', postbodySchemas.textBlockSchema);
hobbiPostSchema.path('body').discriminator('image', postbodySchemas.imageBlockSchema);

const postModel = mongoose.model('hobbi-post', hobbiPostSchema);
module.exports = postModel;