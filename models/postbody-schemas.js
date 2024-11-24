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

const imageBlockSchema = new Schema({
    imageLink: {
        type: String,
        required: true,
    },
    alt: String
}, { _id: false });

exports.blockSchema = blockSchema;
exports.textBlockSchema = textBlockSchema;
exports.imageBlockSchema = imageBlockSchema;