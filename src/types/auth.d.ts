import IUser from "./user";

export type Signup = Omit<
  IUser,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "isVerified"
  | "role"
  | "User_Codes"
>;

export type Login = Pick<IUser, "email" | "password">;
