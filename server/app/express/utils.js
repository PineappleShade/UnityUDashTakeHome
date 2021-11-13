const _ = require('lodash');
const logger = require('../common/helpers/logger');
const exceptions = require('../common/helpers/exceptions');


const mapError = (res, error) => {
  res.status(error.httpStatus || 500);

  if (res.statusCode >= 400) {
    const logFunction = (res.statusCode >= 500) ? logger.error : logger.warn;
    if(error.stack){
      const logMessage = `${error.message}: ${JSON.stringify(error.data)}\n${error.stack.substring(error.stack.indexOf('\n') + 1)}`;
      logFunction(logMessage);
    }
    else{
      logFunction(error);
    }
  }
  return {
    errorKey: error.key || 'INTERNAL_SERVER_ERROR',
    errorData: error.data,
  };
};

const sendOrCatch = (res, promise) => {
  return promise.then(
    async (result) => {
      return (result === undefined) ? {} : result;
    },
    (error) => mapError(res, error),
  ).then((response) => {
    if (_.isArray(response) && _.isEmpty(response)) { // if response empty return 204
      res.sendStatus(204);
    } else {
      res.json(response);
    }
  });
};

const validate = async (input, joiSchema) => {
  return await joiSchema.validateAsync(input).catch((error) => {
    if (error.details) {
      throw exceptions.badRequest(
        'INPUT_VALIDATION_ERROR',
        error.details.map((joiError) => {
          const item = (_.isEmpty(joiError.path)) ?
            joiError.context.object || joiError.context.label :
            joiError.path.reduce((acc, val) => {
              if (_.isEmpty(acc)) { return val; }
              if (_.isNumber(val)) { return acc + `[${val}]`; }
              return acc + `.${val}`;
            }, '');
          const message = joiError.message.split('"').splice(2).join('"');
          return `${item}:${message}`;
        }),
      );
    } else {
      throw exceptions.badRequest('INPUT_VALIDATION_ERROR', [error.message]);
    }
  });
};

module.exports = {
  sendOrCatch,
  validate,
};
