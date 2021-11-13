const Promise = require('bluebird');
const _ = require('lodash');
const mysql = require('mysql');
const config = require('config');
const exceptions = require('../helpers/exceptions');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'user',
  password: 'huf9v3h2o1erbd',
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

const select = async ({ ensureExists }, sqlQuery, values= []) => {
  const response = await query(sqlQuery, values);
  if(ensureExists && _.isEmpty(response)){
    throw exceptions.notFound(`${ensureExists}_NOT_FOUND`, _.flatten(values)[0]);
  }
  return response;
};

const call = async ({ connection, ensureExists }, procedure, values = []) => {
  const response = await query('CALL ?? (?);', [procedure, values]);
  const data = (_.isArray(response[0])) ? response[0] : [];
  if (ensureExists) {
    const mysqlResult = (_.isArray(response)) ? response[1] : response;
    if (mysqlResult.affectedRows === 0 && _.isEmpty(data)) {
      throw exceptions.notFound(`${ensureExists}_NOT_FOUND`);
    }
  }
  return data;
};

const close = () => {
  pool.end();
};

module.exports = {
  query,
  select,
  call,
  close,
};
