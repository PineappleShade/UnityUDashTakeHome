const express = require('express');
const bodyParser = require('body-parser');

const useCors = require('./cors');
const useSwagger = require('./swagger');
const useRoutes = require('./routes');

const app = express();

const init = async () => {
  app.use(bodyParser.json());
  await useCors(app);
  await useSwagger(app);
  await useRoutes(app);
  return app;
};

module.exports = init();
