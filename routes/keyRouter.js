const express = require('express');
const router = express.Router();
const keyController = require('../controllers/keyController');

// /api/key/
router.post('/', keyController.post);

module.exports = router;
