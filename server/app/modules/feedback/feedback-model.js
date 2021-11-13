const mysql = require('../../dao/mysql');
const utils = require('../../helpers/utils');

const options = { ensureExists: 'FEEDBACK' };

const insert = async (gameSessionId, userId, rating, comment) => {
  const data = await mysql.call({}, 'create_feedback',
    [gameSessionId, userId, rating, comment, utils.timestamp()]);
  return data[0];
};

const getAll = async (limit=100, offset=0, sorting='created', order='desc') => {
  order = (order === 'asc') ? 'ASC' : 'DESC';
  return await mysql.query(
    `SELECT *
       FROM bugs
       ORDER BY ${sorting} ${order}
       LIMIT ? OFFSET ?`,
    [parseInt(limit, 10), parseInt(offset, 10)],
  );
};

module.exports = {
  insert,
  getAll,
};