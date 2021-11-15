const gameSessionModel = require('./game-session-model');

const getAll = async (limit, offset, sorting, order) => {
  return await gameSessionModel.getAll(limit, offset, sorting, order);
};

module.exports = {
  getAll,
};
