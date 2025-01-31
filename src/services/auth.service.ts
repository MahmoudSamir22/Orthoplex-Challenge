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
    return user;
  }

  /**
   * @desc    Generate and send a verification code to the user's email
   * @returns {Promise<string>} A promise that resolves to a string.
   * @throws  {ApiError} If the user does not exist.
   * @throws  {ApiError} If the user is already verified.
   * @throws  {Error} If the database operation fails.
   */
  async sendVerificationEmail(userId: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if(!user) throw new ApiError("User does not exist", 404);
    if(user.isVerified) throw new ApiError("User is already verified", 400);

    const codes = generateOTP();
    await prisma.user_Codes.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        verify_email_code: codes.hashedOTP,
        verify_email_expires: codes.otpExpiration,
      },
      update: {
        verify_email_code: codes.hashedOTP,
        verify_email_expires: codes.otpExpiration,
      },
    });
    return codes.otp.toString();
  }

  /**
   * @desc    Verify the user's email using the verification code
   * @returns {Promise<IUser>} A promise that resolves to an user object.
   * @throws  {ApiError} If the code is invalid or expired.
   */
  async verifyUser(userId: string, code: string): Promise<IUser> {
    const hashedOTP = encrypt(code);
    const userCode = await prisma.user_Codes.findFirst({
      where: {
        userId,
        verify_email_code: hashedOTP,
        verify_email_expires: {
          gte: new Date(),
        },
      },
    });
    if (!userCode) throw new ApiError("Invalid or expired code", 400);
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isVerified: true,
      },
    });
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
