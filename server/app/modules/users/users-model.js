const mysql = require('../../dao/mysql');

const getAll = async (limit=100, offset=0, sorting='created', order='desc') => {
  order = (order === 'asc') ? 'ASC' : 'DESC';
  return await mysql.query(
    `SELECT *
       FROM user
       ORDER BY ${sorting} ${order}
       LIMIT ? OFFSET ?`,
    [parseInt(limit, 10), parseInt(offset, 10)],
  );
};

module.exports = {
  getAll,
};