import mongoose from "mongoose";
const Schema = mongoose.Schema;
const postbodySchemas = import("./postbody-schemas.js");

/**
 * mongoDB schema for posts made on hobbi. see postbody-schemas for the schemas of what actually can be IN a post
 */
const hobbiPostSchema = new Schema({
    poster: Schema.Types.ObjectId,
    body: {
        type: [postbodySchemas.blockSchema],
        validate: [(val) => {return val.length <= 10}, '{PATH} exceeds 10 block limit']
    },
    timestamp: { type: Date, default: Date.now },
    meta: {
        stars: Number,
        comments: {
            amount: Number,
            array: Schema.Types.ObjectId,
        }
    }
})

// Apply the discriminators
hobbiPostSchema.path('body').discriminator('text', postbodySchemas.textBlockSchema);
hobbiPostSchema.path('body').discriminator('image', postbodySchemas.imageBlockSchema);
