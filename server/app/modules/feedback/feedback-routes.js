const Joi = require('joi');
const Promise = require('bluebird');
const feedbackController = require('./feedback-controller');
const _ = require('lodash');

const feedbackInsertSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  rating: Joi.number().integer().min(0).max(5),
  comment: Joi.string(),
});

const feedbackFilterSchema = Joi.object({
  rating: Joi.string(),
});

const insertFeedback = (req, res) => {
  const gameSessionId = req.params.gameSessionId;
  const payload = req.body;
  return Promise.all([
    Joi.string().uuid().required().validate(gameSessionId),
    feedbackInsertSchema.validate(payload),
  ]).then(() => {
    return feedbackController.insertFeedback(gameSessionId, payload).then((response) => {
      if (_.isArray(response) && _.isEmpty(response)) {
        res.sendStatus(204);
      } else {
        res.json(response);
      }
      return response;
    }).catch((e) => {
      res.status(e.httpStatus || 500).send({ error: e.key });
    });
  });
};

const getAll = (req, res) => {
  const _limit = req.headers['x-pagination-limit'];
  const _offset = req.headers['x-pagination-offset'];
  const _sorting = req.headers['x-sorting-by'];
  const _order = req.headers['x-sorting-order'];
  const query = req.query;

  return Promise.all([
    Joi.number().integer().validate(_limit),
    Joi.number().integer().validate(_offset),
    Joi.string().valid('created', 'rating').validate(_sorting),
    Joi.string().valid('desc', 'asc').validate(_order),
    Joi.string().validate(query),
    feedbackFilterSchema.validate(query),
  ]).then(() => {
    return feedbackController.getAll(_limit, _offset, _sorting, _order, query?.rating?.split(',')).then((response) => {
      if (_.isArray(response) && _.isEmpty(response)) { // if response empty return 204
        res.sendStatus(204);
      } else {
        res.json(response);
      }
      return (response === undefined) ? {} : response;
    });
  });
};

const getGameSessionFeedback = (req, res) => {
  const gameSessionId = req.params.gameSessionId;
  const _limit = req.headers['x-pagination-limit'];
  const _offset = req.headers['x-pagination-offset'];
  const _sorting = req.headers['x-sorting-by'];
  const _order = req.headers['x-sorting-order'];

  return Promise.all([
    Joi.string().uuid().required().validate(gameSessionId),
    Joi.number().integer().validate(_limit),
    Joi.number().integer().validate(_offset),
    Joi.string().validate(_sorting),
    Joi.string().validate(_order),
  ]).then(() => {
    return feedbackController.getGameSessionFeedback(gameSessionId, _limit, _offset, _sorting, _order).then((response) => {
      if (_.isArray(response) && _.isEmpty(response)) { // if response empty return 204
        res.sendStatus(204);
      } else {
        res.json(response);
      }

      return (response === undefined) ? {} : response;
    });
  });
};

module.exports = {
  insertFeedback,
  getAll,
  getGameSessionFeedback,
};
