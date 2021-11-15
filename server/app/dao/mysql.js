const Promise = require('bluebird');
const _ = require('lodash');
const mysql = require('mysql');
const config = require('config');
const exceptions = require('../helpers/exceptions');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Udb',
});

const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        console.error('MySQL Connection Pool: ' + error.message);
        return reject(exceptions.serviceUnavailable('MYSQL_CONNECTION_POOL_ERROR'));
      }
      return resolve(connection);
    });
  });
};

const queryErrorHandler = (error, reject) => {
  if (error.code === 'ER_DUP_ENTRY') {
    return reject(exceptions.conflict('ITEM_ALREADY_EXISTS'));
  }
  if (['ER_PARSE_ERROR', 'ER_EMPTY_QUERY', 'ER_SP_DOES_NOT_EXIST'].includes(error.code)) {
    return reject(exceptions.serverError('MYSQL_QUERY_MALFORMED', { error: error.sqlMessage }));
  }
  if (error.code === 'ER_SIGNAL_EXCEPTION') {
    return reject(exceptions.notAllowed(error.sqlMessage));
  }
  console.error('MySQL:' + error.message);
  return reject(exceptions.serviceUnavailable('MYSQL_ERROR'));
};

const query = async (sql, values = []) => {
  return getConnection().then((connection) => {
    return new Promise((resolve, reject) => {
      connection.query({
        sql, values,
      }, function (error, results) {
        connection.release();
        if (error) {
          console.error(`MySQL[${connection.threadId}] >> ERROR: ${error.sqlMessage}: ${error.sql}`);
          return queryErrorHandler(error, reject);
        }
        return resolve(results);
      });
    });
  }).catch((error) => {
    console.error('MySQL: ' + error.message);
    throw error;
  });
};

const call = async ( procedure, values = []) => {
  const response = await query('CALL ?? (?);', [procedure, values]);
  return (_.isArray(response[0])) ? response[0] : [];
};

module.exports = {
  query,
  call,
};
