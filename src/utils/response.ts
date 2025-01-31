import { Response } from 'express';
import { ResponseType } from '../types/response';

export default (res: Response, statusCode: number, data: ResponseType) => {
  res.status(statusCode).json(data);
};
