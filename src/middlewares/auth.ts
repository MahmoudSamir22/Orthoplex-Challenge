import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';
import prisma from '../../prisma/client';
import CustomRequest from '../interfaces/customRequest';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '');
    }
    if (!token) {
      return next(new ApiError('No Token Provided', 401));
    }
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        role: true,
        deletedAt: true,
      },
    });
    if (!user) {
      return next(new ApiError('Unauthorized', 401));
    } if (user.deletedAt) {
      return next(new ApiError('Deleted Account', 401));
    }
    (req as CustomRequest).userId = user.id;
    (req as CustomRequest).role = decoded.role;
    // Track user last seen time on every request to the server
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastSeen: new Date(),
      },
    })
    next();
  } catch (error) {
    next(new ApiError('Invalid Token', 401));
  }
};
