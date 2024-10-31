const https = require('https');
const cache = require('./cache'); // Assuming you have a cache utility module
const CustomError = require('./CustomError');

// Controller function to handle currency exchange
const getConversionRates = (req, res, next) => {
  const { fromCurrency, toCurrency, apyToken } = req.params;

  // Validate URL parameters
  if (!fromCurrency || !toCurrency || !apyToken) {
    return next(new CustomError(400, "Parameters 'fromCurrency', 'toCurrency', and 'apyToken' are required."));
  }

  // Convert `toCurrency` into an array (it comes in as a comma-separated string)
  const toCurrencyArray = toCurrency.split(',');

  // Create a unique cache key based on the currencies requested
  const cacheKey = `${fromCurrency}_${toCurrencyArray.join(',')}`;

  // Check cache for existing data
  if (cache.has(cacheKey)) {
    return res.status(200).json({ rates: cache.get(cacheKey), cached: true });
  }

  // Prepare the request payload
  const data = JSON.stringify({ source: fromCurrency, targets: toCurrencyArray });

  // Define the request options for APYHub
  const options = {
    hostname: 'api.apyhub.com',
    path: '/data/convert/currency/multiple',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apy-token': apyToken, // Use the token from URL parameters
    },
  };

  // Make the HTTPS request
  const apiRequest = https.request(options, (apiResponse) => {
    let responseData = '';

    // Collect response data
    apiResponse.on('data', (chunk) => {
      responseData += chunk;
    });

    // Process data once it’s fully received
    apiResponse.on('end', () => {
      try {
        const jsonData = JSON.parse(responseData);

        // Cache the result before sending it in response
        cache.set(cacheKey, jsonData);

        res.status(200).json({ rates: jsonData, cached: false });
      } catch (error) {
        next(new CustomError(500, 'Error processing exchange rates'));
      }
    });
  });

  // Handle request errors
  apiRequest.on('error', (error) => {
    next(new CustomError(500, 'Error connecting to the currency conversion API'));
  });

  // Write data to request body and end request
  apiRequest.write(data);
  apiRequest.end();
};

module.exports = { getConversionRates };
