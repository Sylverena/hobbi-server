const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const bbController = require('../controllers/bbController');

// /api routes
router.use('/key', require('keyRouter'));
router.get('/posts/:id', postController.get);
router.post('/posts', postController.post);
router.get('/bbs', bbController.get);
router.get('/bbs/:name', bbController.get);
router.get('/bbs/:name/posts', postController.get);

module.exports = router;
