const tag = {
  name: 'Users',
  description: 'Users',
};

const paths = {
  '/api/users': {
    get: {
      tags: ['Users'],
      description: 'Get all users',
      parameters: [
        {
          in: 'header',
          name: 'x-pagination-limit',
          type: 'integer',
          format: 'int32',
          default: 100
        },
        {
          in: 'header',
          name: 'x-pagination-offset',
          type: 'integer',
          format: 'int32',
          default: 0
        },
        {
          in: 'header',
          name: 'x-sorting-by',
          description: 'Sort users by:',
          type: 'string',
          enum: ['created', 'userName', 'userType'],
          default: 'created'
        },
        {
          in: 'header',
          name: 'x-sorting-order',
          description: 'Users sort order:',
          type: 'string',
          enum: ['asc', 'desc'],
          default: 'desc'
        },
      ],
      responses: {
        '204': {
          description: 'No content'
        },
      },
    },
  },
};

const models = {};

module.exports = {
  tag,
  paths,
  models,
};
