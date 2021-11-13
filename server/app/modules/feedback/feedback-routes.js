const Joi = require('joi');
const Promise = require('bluebird');
const expressUtils = require('../../express/utils');
const feedbackController = require('./feedback-controller');

const feedbackInsertSchema = Joi.object({
  gameSessionId: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required(),
  rating: Joi.number().integer().min(0).max(5),
  comment: Joi.string(),
});

const insertFeedback = (req, res) => {
  const gameSessionId = req.params.gameSessionId;
  const payload = req.body;
  return expressUtils.sendOrCatch(res, Promise.all([
    feedbackInsertSchema.validate(payload),
  ]).then(() => {
    return feedbackController.insertFeedback(gameSessionId, payload);
  }));
};

const getAll = (req, res) => {
  const _limit = req.headers['x-pagination-limit'];
  const _offset = req.headers['x-pagination-offset'];
  const _sorting = req.headers['x-sorting-by'];
  const _order = req.headers['x-sorting-order'];

  return expressUtils.sendOrCatch(res, Promise.all([
    Joi.number().integer().validate(_limit),
    Joi.number().integer().validate(_offset),
    Joi.string().validate(_sorting),
    Joi.string().validate(_order),
  ]).then(() => {
    return feedbackController.getAll(_limit, _offset, _sorting, _order);
  }));
};

module.exports = {
  insertFeedback,
  getAll,
};
