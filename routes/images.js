const express = require('express');
const router = express.Router();

// todo image api

const profileController = require('../controllers/profileImageController');
const postImageController = require('../controllers/postImageController');

// /api/images todo controller export logic, look at carefinder repo
router.get('/profiles/:id', profileController);
router.get('/post-images/:id', postImageController);

router.post('/profiles/:id', profileController);
router.post('/post-images/:id', postImageController);

router.delete('/profiles/:id', profileController);

module.exports = router;
