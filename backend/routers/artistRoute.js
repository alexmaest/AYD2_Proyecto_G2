const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const artistController = require('../controllers/artistController');
const songController = require('../controllers/songController');

router.get('/banner/:userId', artistController.getBanner);

router.post('/banner', artistController.updateBanner);
router.post('/ProfileConfig', artistController.updateProfile);//JA
router.post('/uploadSong', upload.single('song'), songController.createSong);

module.exports = router;