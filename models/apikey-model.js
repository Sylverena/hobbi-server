const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apiKeySchema = new Schema({
    api_key: {type: String, required: true, trim: true},
    access_level: {type: Number, required: true},
})

module.exports = apiKeySchema;
