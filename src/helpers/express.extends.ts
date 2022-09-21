/* eslint-disable no-unused-vars */
import { Response, Request, NextFunction } from 'express';
import { UserModel } from '../models/user';

export interface ExtendRequest extends Request {
  policy: { user: InstanceType<typeof UserModel>},
  query: {
    offset: string,
    limit: string,
    page: string,
    [key: string]: string
  }
}

export interface ExtendResponse extends Response {
  success(data: any): ExtendResponse
}

export const customResponse = async (req: ExtendRequest, res: Response, next: NextFunction) => {
  (res as any).success = (data: any) => {
    if (typeof data.total_record === 'number') {
      data = handlePaginationResponData(data, req);
    }

    return res.status(200).json({
      success: true,
      data,
    });
  };

  next();
};

const handlePaginationResponData = (data: any, req: ExtendRequest) => {
  const totalPage = Math.ceil(data.total_record / +req.query.limit);

  data = {
    total_record: data.total_record,
    total_page: Math.ceil(data.total_record / +req.query.limit),
    page: +req.query.page,
    limit: +req.query.limit,
    has_previous_page: +req.query.page > 1 && +req.query.page <= totalPage,
    has_next_page: +req.query.page < totalPage,
    list: data.list,
  };

  return data;
};

export { NextFunction } from 'express';
