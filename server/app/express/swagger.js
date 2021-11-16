const _ = require('lodash');
const jsonPackage = require('../../package.json');

const feedback = require('../modules/feedback/feedback-swagger');

const swagger = {
  swagger: '2.0',
  info: {
    version: jsonPackage.version,
    title: jsonPackage.description,
  },
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

const swaggerTags = [
  feedback.tag,
];

const paths = _.assign({},
  feedback.paths,
);

const definitions = _.assign({},
  feedback.models,
);

module.exports = async (app) => {
  app.get('/swagger', (req, res) => {
    res.json(_.assign({}, swagger, {
      tags: swaggerTags,
      paths,
      definitions,
    }));
  });
};
