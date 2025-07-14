const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const statsController = require('../controllers/statsController');

router.post('/shorten', urlController.shortenUrl);
router.get('/r/:shortCode', urlController.redirectUrl);   
router.get('/stats/:shortCode', statsController.getStats); 

module.exports = router;