const feedbackModel = require('./feedback-model');

const insertFeedback = async (gameSessionId, payload) => {
  return await feedbackModel.insert(gameSessionId, payload.userId, payload.rating, payload.comment);
};

const getAll = async (limit, offset, sorting, order) => {
  return await feedbackModel.getAll(limit, offset, sorting, order);
};

module.exports = {
  insertFeedback,
  getAll,
};
