const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

// /api routes
router.use('/key', require('keyRouter'));
router.use('/images', require('images'));
router.get('/posts/:id', postController);
router.post('/posts', postController);

module.exports = router;
