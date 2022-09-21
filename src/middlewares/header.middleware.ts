import { NextFunction, Response, Request } from 'express';

export const allowHeaders = async (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');
  res.header('Access-Control-Allow-Methods', '*');
  return next();
};
