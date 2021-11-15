const Promise = require('bluebird');

module.exports = (app) => {

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', [
      'Content-Type',
      'Authorization',
      'X-Pagination-Limit',
      'X-Pagination-Offset',
    ].join(','));
    if (req.method === 'OPTIONS') {
      res.send();
    } else {
      next();
    }
  });

  return Promise.resolve();

};
