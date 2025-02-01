import prisma from "../../prisma/client";
import ApiError from "../utils/ApiError";
import IUser, { UpdateUser, UserQuery } from "../types/user";
import IUserService from "../interfaces/user.service";
import { PaginateType } from "../types/pagination";
import { paginate } from "../utils/pagination";
import { Signup } from "../types/auth";

class UserService implements IUserService {
  /**
   * @desc    Get all users
   * @returns {Promise<PaginateType<IUser>>} A promise that resolves to an array of user objects.
   * @throws  {Error} If the database operation fails.
   */
  async getUsersList(query: UserQuery): Promise<PaginateType<IUser>> {
    return paginate("user", {
      where: {
        deletedAt: null,
        role: query.role,
        name: query.name
          ? {
              contains: query.name,
            }
          : undefined,
        email: query.email
          ? {
              contains: query.email,
            }
          : undefined,
        // Query params is always string. Convert it to boolean if it exists
        isVerified: query.isVerified ? query.isVerified == "true" : undefined,
        createdAt:
          query.createdAt_from || query.createdAt_to
            ? {
                gte: query.createdAt_from,
                lte: query.createdAt_to,
              }
            : undefined,
      },
    }, query.page, query.limit);
  }

  /**
   * @desc    Get a user by id
   * @returns {Promise<IUser>} A promise that resolves to an user object.
   * @throws  {ApiError} If the user does not exist.
   * @throws  {Error} If the database operation fails.
   */

  async getUserDetails(userId: string): Promise<IUser> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ApiError("User does not exist", 404);
    return user;
  }

  /**
   * @desc    Update a user by id
   * @returns {Promise<IUser>} A promise that resolves to an user object.
   * @throws  {ApiError} If the user does not exist.
   * @throws  {Error} If the database operation fails.
   */

  async updateUserDetails(userId: string, data: UpdateUser): Promise<IUser> {
    await this.checkUserExistence(userId);
    return prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }

  /**
   * @desc    Delete a user by id
   * @returns {Promise<IUser>} A promise that resolves to an user object.
   * @throws  {ApiError} If the user does not exist.
   * @throws  {Error} If the database operation fails.
   */

  async deleteUserDetails(userId: string): Promise<IUser> {
    await this.checkUserExistence(userId);
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  /**
   * @desc    Verify a user by email
   * @returns {Promise<IUser>} A promise that resolves to an user object.
   * @throws  {ApiError} If the user does not exist.
   * @throws  {Error} If the database operation fails.
   */
  async verifyUser(email: string): Promise<IUser> {
    const user = await prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
    if (!user) throw new ApiError("User does not exist", 404);
    return prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
      },
    });
  }

  /**
   * @desc    Get the count of verified users
   * @returns {Promise<number>} A promise that resolves to a number.
   * @throws  {Error} If the database operation fails.
   */
  async verifiedUserCount(): Promise<number> {
    return prisma.user.count({
      where: {
        isVerified: true,
        deletedAt: null,
      },
    });
  }

  /**
   * @desc    Get the count of registered users
   * @returns {Promise<number>} A promise that resolves to a number.
   * @throws  {Error} If the database operation fails.
   */
  async registeredUserCount(): Promise<number> {
    return prisma.user.count({
      where: {
        deletedAt: null,
      },
    });
  }

  private async checkUserExistence(userId: string): Promise<IUser> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ApiError("User does not exist", 404);
    return user;
  }
}

const userService = new UserService();
export default userService;
