import { Login, Signup } from "../types/auth";
import IUser from "../types/user";

export default interface IAuthService {
  signup(data: Signup): Promise<IUser>;
  login(data: Login): Promise<IUser>;
}
