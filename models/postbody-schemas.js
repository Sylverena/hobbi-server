import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Posts are organized in block format. That is, a post can contain a finite number of blocks that are either paragraphs
// of text or images.

const blockSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['text', 'image']
    }
}, { discriminatorKey: 'type', _id: false });

const textBlockSchema = new Schema({
   text: {
       type: String,
       required: true,
   }
}, {_id: false});

const imageBlockSchema = new Schema({ //todo refactor into link
    imageId: {
        type: Schema.Types.ObjectId,
        required: true, // This ID points to the file in GridFS
        ref: 'post-uploads.files'
    },
    alt: String
}, { _id: false });

exports.blockSchema = blockSchema;
exports.textBlockSchema = textBlockSchema;
exports.imageBlockSchema = imageBlockSchema;