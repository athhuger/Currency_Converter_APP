const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // cache for 1 hour

module.exports = cache;