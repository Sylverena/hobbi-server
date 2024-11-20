const express = require('express');
const router = express.Router();

// /api routes
router.use('/key', require('keyRouter'));
router.use('/images', require('images'));
router.use('/posts', require('posts'))

module.exports = router;
