const express = require('./express');

const port = 3000;

express.then((app) => {
  console.log('Starting server ...');
  app.listen(port);
  console.log(`Started server on port ${port}`);
});
