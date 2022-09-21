import * as jwt from 'jsonwebtoken';

const config = process.env;

export const makeJwtToken = (payload: any, expiresInSecond?: number): Promise<{ token: string, expired: number }> => {
  return new Promise<{ token: string, expired: number }>((resolve, reject) => {
    const expiresIn = expiresInSecond || +config.JWT_EXPIRES_IN_HOUR * 60 * 60;
    return jwt.sign(payload,
      config.JWT_SECRECT_KEY, {
        algorithm: 'HS256',
        expiresIn,
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        if (!token) {
          return new Error('Empty token');
        }
        return resolve({ token, expired: expiresIn * 1000 + new Date().getTime() });
      });
  });
};

export const verifyJwtToken = (token: string): Promise<jwt.JwtPayload> => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRECT_KEY, {
      ignoreExpiration: config.JWT_IGNORE_EXPIRATION === 'true',
    }, (err, data) => {
      if (err !== null || typeof data === 'string') {
        return reject(err);
      }
      return resolve(data);
    });
  });
};
