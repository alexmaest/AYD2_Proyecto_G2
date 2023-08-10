const express = require('express');
const router = express.Router();

const creatorController = require('../controllers/creatorController');

router.post('/banner',creatorController.updateBanner);
router.get('/banner/:userId',creatorController.getBanner);

module.exports = router;