const rateLimit = require('express-rate-limit');

const limiter = rateLimit({ // 150 запросов в 10 минут
  windowMs: 10 * 60 * 1000,
  max: 150,
});

module.exports = {
  limiter,
};
