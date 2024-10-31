const rateLimit = require('express-rate-limit');

let limiter = rateLimit({
    max:100,
    windowMs:60*60*1000,
    message: "Too many requests try again in an hour"
  
  });

  module.exports = limiter;