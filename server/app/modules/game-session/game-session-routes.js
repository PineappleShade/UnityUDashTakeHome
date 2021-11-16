const Joi = require('joi');
const Promise = require('bluebird');
const gameSessionController = require('./game-session-controller');
const _ = require('lodash');

const getAll = (req, res) => {
  const _limit = req.headers['x-pagination-limit'];
  const _offset = req.headers['x-pagination-offset'];
  const _sorting = req.headers['x-sorting-by'];
  const _order = req.headers['x-sorting-order'];

  return Promise.all([
    Joi.number().integer().validate(_limit),
    Joi.number().integer().validate(_offset),
    Joi.string().valid('created', 'gameSessionName').validate(_sorting),
    Joi.string().valid('desc', 'asc').validate(_order),
  ]).then(() => {
    return gameSessionController.getAll(_limit, _offset, _sorting, _order).then((response) => {
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
  getAll,
};
