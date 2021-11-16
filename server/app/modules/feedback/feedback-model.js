const mysql = require('../../dao/mysql');
const utils = require('../../helpers/utils');

const options = { ensureExists: 'FEEDBACK' };

const insert = async (gameSessionId, userId, rating, comment) => {
  const data = await mysql.call( 'create_feedback',
    [gameSessionId, userId, rating, comment, utils.timestamp()]);
  return data[0];
};

const getAll = async (limit= 100, offset= 0, sorting= 'created', order= 'desc', filterByRating = [0,1,2,3,4,5] ) => {
  order = (order === 'asc') ? 'ASC' : 'DESC';
  let additionalWhereFilters = filterByRating.join();
  return await mysql.query(
    `SELECT *
       FROM feedback
       WHERE rating IN (${additionalWhereFilters})
       ORDER BY ${sorting} ${order}
       LIMIT ? OFFSET ?`,
    [parseInt(limit, 10), parseInt(offset, 10)],
  );
};

const getGameSessionFeedback = async (gameSessionId, limit=100, offset=0, sorting='created', order='desc') => {
  order = (order === 'asc') ? 'ASC' : 'DESC';
  return await mysql.query(
    `SELECT *
       FROM feedback
       WHERE gameSessionId = ?
       ORDER BY ${sorting} ${order}
       LIMIT ? OFFSET ?`,
    [gameSessionId, parseInt(limit, 10), parseInt(offset, 10)],
  );
};

module.exports = {
  insert,
  getAll,
  getGameSessionFeedback,
};