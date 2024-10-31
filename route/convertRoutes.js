const express = require('express');
const { getConversionRates } = require('../controller/convertController');
const router = express.Router();

// Define route with URL parameters for fromCurrency, toCurrency, and apyToken
router.post('/convert/:fromCurrency/:toCurrency/:apyToken', getConversionRates);

module.exports = router;
