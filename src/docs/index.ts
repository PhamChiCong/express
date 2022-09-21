import * as authSwagger from './auth.swagger';
import * as userSwagger from './user.swagger';

export const swaggerDocument = {
  openapi: '3.0.1',
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  info: {
    version: '1.0.0',
    title: 'APIs document',
  },
  servers: [
    {
      url: 'http://localhost:1997/api/v1',
      description: 'LCL Env',
    },
  ],
  paths: {
    /** Auth */
    '/auth/register': {
      'post': authSwagger.register,
    },
    '/auth/login': {
      'post': authSwagger.login,
    },

    /** User */
    '/user/infor': {
      'get': userSwagger.getUserInfor,
    },
  },
};
