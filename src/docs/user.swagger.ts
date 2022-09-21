/* eslint-disable max-len */
const TAG = 'User';

export const getUserInfor = {
  tags: [TAG],
  description: 'Get user infor',
  operationId: 'getUserInfor',
  security: [{ bearerAuth: [] }],
  responses: {
    '200': {
      description: 'Call api successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties:
            {
              success: { type: 'boolean', required: true },
              data: {
                type: 'object',
                required: true,
              },
            },
          },
        },
      },
    },
    '404': {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', required: true },
              error: {
                type: 'object',
                properties: { code: { type: 'number' }, message: { type: 'string' } },
                required: true,
              },
            },
            example: {
              'success': false,
              'error': {
                'code': 404,
                'message': 'Not found',
              },
            },
          },
        },
      },
    },
  },
};
