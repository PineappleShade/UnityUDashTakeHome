const tag = {
  name: 'Game Sessions',
  description: 'Players Game Sessions',
};

const paths = {
  '/api/gameSessions': {
    get: {
      tags: ['Game Sessions'],
      description: 'Get all game sessions',
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
          description: 'Sort game sessions by:',
          type: 'string',
          enum: ['created', 'gameSessionName'],
          default: 'created'
        },
        {
          in: 'header',
          name: 'x-sorting-order',
          description: 'Game sessions sort order:',
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
