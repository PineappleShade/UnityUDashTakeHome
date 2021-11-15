const Joi = require('joi');
const Promise = require('bluebird');
const feedbackController = require('./users-controller');
const _ = require('lodash');

const feedbackInsertSchema = Joi.object({
  gameSessionId: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required(),
  rating: Joi.number().integer().min(0).max(5),
  comment: Joi.string(),
});

const insertFeedback = (req, res) => {
  const gameSessionId = req.params.gameSessionId;
  const payload = req.body;
  return Promise.all([
    feedbackInsertSchema.validate(payload),
  ]).then(() => {
    const response = feedbackController.insertFeedback(gameSessionId, payload);
    if (_.isArray(response) && _.isEmpty(response)) { // if response empty return 204
      res.sendStatus(204);
    } else {
      res.json(response);
    }
    return response;
  });
  // return expressUtils.sendOrCatch(res, Promise.all([
  //   feedbackInsertSchema.validate(payload),
  // ]).then(() => {
  //   return feedbackController.insertFeedback(gameSessionId, payload);
  // }));
};

const getAll = (req, res) => {
  const _limit = req.headers['x-pagination-limit'];
  const _offset = req.headers['x-pagination-offset'];
  const _sorting = req.headers['x-sorting-by'];
  const _order = req.headers['x-sorting-order'];

  return Promise.all([
    Joi.number().integer().validate(_limit),
    Joi.number().integer().validate(_offset),
    Joi.string().validate(_sorting),
    Joi.string().validate(_order),
  ]).then(() => {
    return feedbackController.getAll(_limit, _offset, _sorting, _order).then((response) => {
      if (_.isArray(response) && _.isEmpty(response)) { // if response empty return 204
        res.sendStatus(204);
      } else {
        res.json(response);
      }
      console.log({response});

      return (response === undefined) ? {} : response;
    });

    // return feedbackController.getAll(_limit, _offset, _sorting, _order);
    // return response;
  });

  // return expressUtils.sendOrCatch(res, Promise.all([
  //   Joi.number().integer().validate(_limit),
  //   Joi.number().integer().validate(_offset),
  //   Joi.string().validate(_sorting),
  //   Joi.string().validate(_order),
  // ]).then(() => {
  //   return feedbackController.getAll(_limit, _offset, _sorting, _order);
  // }));
};

module.exports = {
  insertFeedback,
  getAll,
};
