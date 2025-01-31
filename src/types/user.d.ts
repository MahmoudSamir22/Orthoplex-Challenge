import { QueryType } from "./query";

export default interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
}

export type UserQuery = Partial<
  QueryType & {
    name: string;
    email: string;
    role: string;
    isVerified: boolean | string;
    createdAt_from: Date;
    createdAt_to: Date;
  }
>;

export type UpdateUser = Pick<IUser, "name" | "email" | "role">;