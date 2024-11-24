const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bbSchema = new Schema({
    name: {
        type: String,
        required: true,
        caseSensitive: false
    }
})

module.exports = mongoose.model('bbs', bbSchema);
