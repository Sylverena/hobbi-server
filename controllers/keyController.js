const apiKeyModel = require("../models/apikey-model");
const keygen = require("apikeygen")

const keyController = {
    post: async (req, res) => {
        let mongoQuery = {api_key: keygen.apikey()};

        // key should be 0-2
        mongoQuery.access_level = req.query.access_level ?? 2;

        const key = await apiKeyModel.create(mongoQuery);

        res.status(201).json({response: key});
    }
}

module.exports = keyController;
