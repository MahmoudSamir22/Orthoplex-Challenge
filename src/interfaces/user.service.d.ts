import { Signup } from "../types/auth";
import { PaginateType } from "../types/pagination";
import IUser, { UserQuery } from "../types/user";

export default interface IUserService {
  getUsersList(query: UserQuery): Promise<PaginateType<IUser>>;
  getProfile(id: string): Promise<IUser>;
  updateProfile(id: string, data: Signup): Promise<IUser>;
  deleteProfile(id: string): Promise<IUser>;
}
