const _ = require('lodash');
const jsonPackage = require('../../package.json');

const feedback = require('../modules/feedback/feedback-swagger');
const gameSession = require('../modules/game-session/game-session-swagger');
const users = require('../modules/users/users-swagger');

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
  gameSession.tag,
  users.tag,
];

const paths = _.assign({},
  feedback.paths,
  gameSession.paths,
  users.paths,
);

const definitions = _.assign({},
  feedback.models,
  gameSession.models,
  users.models,
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
