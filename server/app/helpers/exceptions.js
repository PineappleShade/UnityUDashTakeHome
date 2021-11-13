const exception = (statusCode, statusName, errorKey, data) => {
  const error = new Error(`${statusName}: ${errorKey}`);
  error.httpStatus = statusCode;
  error.key = errorKey;
  error.data = data;
  return error;
};

const badRequest = (errorKey, data) => {
  return exception(400, 'Bad Request', errorKey, data);
};

const unauthorized = (errorKey, data) => {
  return exception(401, 'Unauthorized', errorKey, data);
};

const notFound = (errorKey, data) => {
  return exception(404, 'Data not Found', errorKey, data);
};

const notAllowed = (errorKey, data) => {
  return exception(405, 'Method not Allowed', errorKey, data);
};

const conflict = (errorKey, data) => {
  return exception(409, 'Conflict', errorKey, data);
};

const requestEntityTooLarge = (errorKey, data) => {
  return exception(413, 'Request Entity Too Large', errorKey, data);
};

const serverError = (errorKey, data) => {
  return exception(500, 'Internal Server Error', errorKey, data);
};

const notImplemented = (errorKey, data) => {
  return exception(501, 'Not implemented', errorKey, data);
};

const serviceUnavailable = (errorKey, data) => {
  return exception(503, 'Service Unavailable', errorKey, data);
};

const gatewayTimeout = (errorKey, data) => {
  return exception(504, 'Gateway Timeout', errorKey, data);
};

module.exports = {
  badRequest,
  unauthorized,
  notFound,
  notAllowed,
  serverError,
  notImplemented,
  serviceUnavailable,
  requestEntityTooLarge,
  conflict,
  gatewayTimeout,
};
