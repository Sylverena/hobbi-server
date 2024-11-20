const express = require('express');
const router = express.Router();
const keyController = require('../controllers/keyController');

//todo key controller

// /api/key/
router.get('/', keyController.get);
router.post('/', keyController.create);

module.exports = router;
