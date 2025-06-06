const rateLimit = require('express-rate-limit');


module.exports = () => rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: {
    message: 'Trop de requêtes. Veuillez réessayer plus tard.'
  }
});
