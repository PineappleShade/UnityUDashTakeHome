const feedbackModel = require('./feedback-model');
const _ = require('lodash');

const insertFeedback = async (gameSessionId, payload) => {
  const gameSessionFeedback = await feedbackModel.getGameSessionFeedback(gameSessionId);
  const hasFeedback = _.find(gameSessionFeedback, { userId: payload.userId });
  if (hasFeedback){
    const error = new Error(`Bad Request: Feedback already exists`);
    error.httpStatus = 400;
    error.key = 'Feedback already exists';
    throw error;
  }
  return await feedbackModel.insert(gameSessionId, payload.userId, payload.rating, payload.comment);
};

const getAll = async (limit, offset, sorting, order, filterByRating) => {
  return await feedbackModel.getAll(limit, offset, sorting, order, filterByRating);
};

const getGameSessionFeedback = async (gameSessionId, limit, offset, sorting, order) => {
  return await feedbackModel.getGameSessionFeedback(gameSessionId, limit, offset, sorting, order);
};

module.exports = {
  insertFeedback,
  getAll,
  getGameSessionFeedback,
};
