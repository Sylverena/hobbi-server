import mongoose from "mongoose";
const Schema = mongoose.Schema;
const postbodySchemas = import("./postbody-schemas.js");

//todo will need to find a way to abstract post body

/**
 * mongoDB schema for posts made on hobbi. see postbody-schemas for the schemas of what actually can be IN a post
 */
const HobbiPostSchema = new Schema({
    poster: ObjectId,
    body: {
        type: [postbodySchemas.blockSchema],
        validate: [(val) => {return val.length <= 10}, '{PATH} exceeds 10 block limit']
    },
    timestamp: { type: Date, default: Date.now },
    meta: {
        stars: Number,
        comments: {
            amount: Number,
            array: ObjectId
        }
    }

})

// Apply the discriminators todo this wont work
postSchema.path('body').discriminator('text', textBodySchema);
postSchema.path('body').discriminator('image', imageBodySchema);
