const tag = {
  name: 'Feedback',
  description: 'Players feedback',
};

const paths = {
  '/api/feedback': {
    get: {
      tags: ['Feedback'],
      description: 'Get all feedback',
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
          description: 'Sort feedback by:',
          type: 'string',
          enum: ['created', 'rating'],
          default: 'created'
        },
        {
          in: 'header',
          name: 'x-sorting-order',
          description: 'Feedback sort order:',
          type: 'string',
          enum: ['asc', 'desc'],
          default: 'desc'
        },
        {
          in: 'query',
          name: 'rating',
          schema: {
            type: 'string',
            enum: [0,1,2,3,4,5],
            example: '0,3,5',
          },
        },
      ],
      responses: {
        '204': {
          description: 'No content'
        },
      },
    },
  },
  '/api/feedback/{gameSessionId}': {
    post: {
      tags: ['Feedback'],
      description: 'Insert new feedback',
      parameters: [
        {
          in: "path",
          name: "gameSessionId",
          description: "Game session id where the feedback will be submitted",
          required: true,
          type: "string",
          example: "6648be16-465a-11ec-a0ce-0242ac110002"
        },
        {
          in: 'body',
          name: 'body',
          schema: { $ref: '#/definitions/Feedback' },
        }
      ],
      responses: {
        '201': {
          description: 'Event created'
        },
        '400': {
          description: 'User already submitted feedback'
        },
      },
    },
  },
};

const models = {};

models.Feedback = {
  type: 'object',
  required: ['userId'],
  properties: {
    userId: { type: 'string', example: '30ef5656-4500-11ec-81d3-0242ac130003' },
    rating: { type: 'integer', example: 3 },
    comment: { type: 'string', example: 'Comment 123' },
  },
};

module.exports = {
  tag,
  paths,
  models,
};
