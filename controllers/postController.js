const postModel = require('../models/hobbi-post-model');
const apiKeyModel = require('../models/apikey-model');
const bbModel = require('../models/bbModel');
const mongoose = require('mongoose');

const postController = {
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

        if(!req.params.name) {
            try {
                const filter = {_id: new mongoose.Types.ObjectId(req.params.id)};

                const post = await postModel.findOne(filter).exec();

                if (!post)
                    return res.status(404).json({})

                res.json(post);

            } catch (e) {
                return res.status(400).json({message: 'Invalid ID'})
            }
        }
        else {
            const bbFilter = {name: req.params.name};

            const bbId = await bbModel.findOne(bbFilter).exec();
            if (!bbId)
                return res.status(404).json({message: 'BB not found'});

            const postFilter = {bb: bbId};

            const post = await postModel.find(postFilter);

            if (!post)
                return res.status(404).json({})

            res.json(post);
        }
    },
    post: async (req, res) => {
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

        if (!req.is('application/json'))
            return res.status(400).json({message: 'Bad request'})

        try {
            const hobbiPost = new postModel(req.body);

            hobbiPost.validateSync();

            const savedPost = await hobbiPost.save();

            return res.status(200).json({response: savedPost});
        } catch (e) {
            if (e.name === 'ValidationError')
                return res.status(400).send({error: 'Validation failed', details: e.errors});

            res.status(500).send({error: 'Server error', details: e.message});
        }
    }
}

module.exports = postController;
