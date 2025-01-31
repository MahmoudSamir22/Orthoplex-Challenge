import prisma from "../../prisma/client";
import ApiError from "../utils/ApiError";
import bcrypt from "bcrypt";
import IAuthService from "../interfaces/auth.service";
import { Signup, Login } from "../types/auth";
import IUser from "../types/user";
import generateOTP, { encrypt } from "../utils/generateOTP";

class AuthService implements IAuthService {
  /**
   * @desc    Register a new user
   * @returns {Promise<IUser>} A promise that resolves to an user object.
   * @throws  {Error} If the database operation fails.
   * @throws  {ApiError} If the user data is invalid.
   */
  async signup(data: Signup): Promise<IUser> {
    await this.validateUserData(data);
    return prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 10),
      },
    });
  }

  /**
   * @desc    Login a user
   * @returns {Promise<IUser>} A promise that resolves to an user object.
   * @throws  {ApiError} If the user does not exist.
   * @throws  {ApiError} If the user password is invalid.
   */
  async login(data: Login): Promise<IUser> {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
        deletedAt: null,
      },
    });
    if (!user || !(await bcrypt.compare(data.password, user.password)))
      throw new ApiError("Invalid email or password", 400);
    if(user.isVerified === false) throw new ApiError("User is not verified", 400);
    return user;
  }

  /**
   * @desc    Validate the user data before creating a new user
   * @throws  {ApiError} If the email is already in use.
   */
  private async validateUserData(data: Signup) {
    const existedUser = await prisma.user.findFirst({
      where: {
        email: data.email,
        deletedAt: null,
      },
    });
    if (existedUser) throw new ApiError("Email is already in use", 404);
  }
}

const authService = new AuthService();
export default authService;
