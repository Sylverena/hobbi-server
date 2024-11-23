const postModel = require('../models/postbody-schemas');
const apiKeyModel = require('../models/apikey-model');
const mongoose = require('mongoose');

const postController = {
    get: async (req, res) => {
        const apiKey = req.header("x-api-key");
        console.log(apiKey)

        if (apiKey === undefined)
        {
            const error = new Error("Bad request. Missing x-api-key header.")
            return res.status(400).json({
                status: 400,
                error: error.message,
                response: {}
            });
        }

        const api_doc = await apiKeyModel.find({api_key: apiKey} ).exec();

        if (!api_doc)
        {
            const error = new Error("Unauthorized")
            return res.status(403).json({
                status: 403,
                error: error.message,
                response: {}
            });
        }

        try {
            const filter = {_id: new mongoose.Types.ObjectId(req.params.id)};

            const post = await postController.findOne(filter);

            if (!post)
                return res.status(404).json({})

            res.json(post);

        } catch (e) {
            return res.status(400).json({message: 'Invalid ID'})
        }

    },
    post: async (req, res) => { //todo

    }
}

module.exports = postController;
