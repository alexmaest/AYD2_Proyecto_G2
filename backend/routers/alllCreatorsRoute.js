const express = require('express');//content creator for admin page to enable o disable acounts
const router = express.Router();

const { contentCreatorModel } = require('../models/contentCreator');

router.get('/', contentCreatorModel.getAllContentCreator);
//router.get('/2', contentCreatorModel.getAllContentCreator);//para cuando vaya escalando

module.exports = router;