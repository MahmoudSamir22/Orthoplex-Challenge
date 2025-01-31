import jwt from "jsonwebtoken";
import { Payload } from "../types/jwt_payload";
import IUser from "../types/user";

const signToken = (
  payload: Payload,
  sekretKey: string,
  expiresIn: any
): string => jwt.sign(payload, sekretKey, { expiresIn });

export default (user: Partial<IUser>) => {
  const payload = { id: user.id!, role: user.role! };
  const accessToken: string = signToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET_KEY!,
    process.env.ACCESS_TOKEN_EXPIRE!
  );
  const refreshToken: string = signToken(
    payload,
    process.env.REFRESH_TOKEN_SECRET_KEY!,
    process.env.REFRESH_TOKEN_EXPIRE!
  );
  return { accessToken, refreshToken };
};
