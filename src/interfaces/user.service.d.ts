import { Signup } from "../types/auth";
import { PaginateType } from "../types/pagination";
import IUser, { UpdateUser, UserQuery } from "../types/user";

export default interface IUserService {
  getUsersList(query: UserQuery): Promise<PaginateType<IUser>>;
  getUserDetails(id: string): Promise<IUser>;
  updateUserDetails(id: string, data: UpdateUser): Promise<IUser>;
  deleteUserDetails(id: string): Promise<IUser>;
  verifyUser(email: string): Promise<IUser>;
  verifiedUserCount(): Promise<number>;
  registeredUserCount(): Promise<number>;
}
