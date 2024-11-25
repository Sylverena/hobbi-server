const mongoose = require('mongoose');
const profileModel = require('../models/profile-model');
const apiKeyModel = require("../models/apikey-model");

const profileController = {
    get: async (req, res) => {
        const apiKey = req.header("x-api-key");

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

        if (!req.params?.id)
            return res.status(400).json({message: 'Missing ID'})

        try {
            const filter = {_id: new mongoose.Types.ObjectId(req.params.id)};

            const profile = await profileModel.findOne(filter).exec();

            if (!profile)
                return res.status(404).json({})

            return res.json(profile);

        } catch (e) {
            return res.status(400).json({message: 'Invalid ID'})
        }


    },
    post: async (req, res) => {
        const apiKey = req.header("x-api-key");

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
            const hobbiProfile = new profileModel(req.body);
            hobbiProfile.validateSync();
            const savedProfile = await hobbiProfile.save();

            return res.status(200).json({response: savedProfile});

        } catch (e) {
            if (e.name === 'ValidationError')
                return res.status(400).send({error: 'Validation failed', details: e.errors});

            res.status(500).send({error: 'Server error', details: e.message});
        }

    },
    patch: async (req, res) => {
        const apiKey = req.header("x-api-key");

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

        if (!req.params?.id)
            return res.status(400).json({message: 'Missing ID'})

        if (!req.is('application/json'))
            return res.status(400).json({message: 'Bad request'})

        try{
            const filter = {_id: new mongoose.Types.ObjectId(req.params.id)};

            const profile = await profileModel.findOneAndUpdate(filter, req.body, {}).exec();

            if (!profile)
                return res.status(404).json({})

        } catch (e) {
            if (e.name === 'ValidationError')
                return res.status(400).send({error: 'Validation failed', details: e.errors});
            else if (e.name === 'DocumentNotFoundError')
                return res.status(404).send({error: 'Id not found', details: e.errors});

            res.status(500).send({error: 'Server error', details: e.message});
        }
    }
};

module.exports = profileController;
