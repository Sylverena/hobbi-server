const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const bbController = require('../controllers/bbController');
const profileController = require('../controllers/profileController');
const keyController = require('../controllers/keyController');

// /api/key/
router.post('/key', keyController.post);
router.get('/posts/:id', postController.get);
router.post('/posts', postController.post);
router.get('/bbs', bbController.get);
router.get('/bbs/:name', bbController.get);
router.get('/bbs/:name/posts', postController.get);
router.get('/profiles/:id', profileController.get);
router.post('/profiles', profileController.post);
router.patch('/profiles/:id', profileController.patch);

module.exports = router;
