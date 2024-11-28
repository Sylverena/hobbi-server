const mongoose = require('mongoose');
const bbModel = require('../models/bbModel');
const apiKeyModel = require("../models/apikey-model");
const postController = require("./postController");

const bbController = {
    get: async (req, res) => {
        const apiKey = req.header("x-api-key");
        console.log(apiKey)

        if (apiKey === undefined) {
            const error = new Error("Bad request. Missing x-api-key header.")
            return res.status(400).json({
                status: 400,
                error: error.message,
                response: {}
            });
        }

        const api_doc = await apiKeyModel.findOne({api_key: apiKey}).exec();

        if (!api_doc) {
            const error = new Error("Unauthorized")
            return res.status(403).json({
                status: 403,
                error: error.message,
                response: {}
            });
        }

        try {
            let filter= {}
            if (req.params?.name)
                filter.name = req.params.name;

            const bbsSet = await bbModel.find(filter).exec();

            return res.status(200).json(bbsSet);
        } catch (e) {
            return res.status(500).json({error: e.message});
        }
    }
};

module.exports = bbController;
