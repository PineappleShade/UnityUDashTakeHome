const userModel = require('./users-model');

const getAll = async (limit, offset, sorting, order) => {
  return await userModel.getAll(limit, offset, sorting, order);
};

module.exports = {
  getAll,
};
