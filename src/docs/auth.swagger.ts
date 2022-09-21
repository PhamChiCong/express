const TAG = 'Auth';

export const register = {
  tags: [TAG],
  description: 'User registration',
  operationId: 'register',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties:
          {
            email: { type: 'string', required: true },
            password: { type: 'string', required: true },
            username: { type: 'string', required: true },
            firstname: { type: 'string', required: true },
            lastname: { type: 'string', required: true },
          },
          example: {
            email: 'congpc@yopmail.com',
            password: '123456',
            username: 'congpc',
            firstname: 'Cong',
            lastname: 'Pham'
          },
        },
      },
    },
  },
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

export const login = {
  tags: [TAG],
  description: 'Login with email',
  operationId: 'loginWithEmail',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties:
          {
            email: { type: 'string', required: true },
            password: { type: 'string', required: true },
          },
          example: {
            email: 'congpc@yopmail.com',
            password: '123456',
          },
        },
      },
    },
  },
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
