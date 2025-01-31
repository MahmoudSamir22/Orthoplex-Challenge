import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import response from "../utils/response";
import CustomRequest from "../interfaces/customRequest";

class UserController {
  /**
   * @desc    Get list of users
   * @route   GET /api/users
   * @access  Private [Admin]
   */
  async getUsersList(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, pagination } = await userService.getUsersList(req.query);
      const [verifiedUserCount, registeredUserCount] = await Promise.all([
        userService.verifiedUserCount(),
        userService.registeredUserCount(),
      ]);
      response(res, 200, {
        status: true,
        message: "Users fetched successfully",
        pagination,
        data: {
          users_counters: {
            registered_users: registeredUserCount,
            verified_users: verifiedUserCount,
          },
          users: data,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Get logged in user  profile
   * @route   GET /api/users/profile
   * @access  Private
   */
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req as CustomRequest;
      const user = await userService.getUserDetails(userId);
      response(res, 200, {
        status: true,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Update logged in user  profile
   * @route   PATCH /api/users/profile
   * @access  Private
   */
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req as CustomRequest;
      const user = await userService.updateUserDetails(userId, req.body);
      response(res, 200, {
        status: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Delete logged in user profile
   * @route   DELETE /api/users/profile
   * @access  Private
   */
  async deleteProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req as CustomRequest;
      await userService.deleteUserDetails(userId);
      response(res, 200, {
        status: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Get user details
   * @route   GET /api/users/:id
   * @access  Private [Admin]
   */
  async getUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserDetails(req.params.id);
      response(res, 200, {
        status: true,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Update user details
   * @route   PATCH /api/users/:id
   * @access  Private [Admin]
   */
  async updateUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.updateUserDetails(req.params.id, req.body);
      response(res, 200, {
        status: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Delete user details
   * @route   DELETE /api/users/:id
   * @access  Private [Admin]
   */
  async deleteUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.deleteUserDetails(req.params.id);
      response(res, 200, {
        status: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.verifyUser(req.body.email);
      response(res, 200, {
        status: true,
        message: "User verified successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();
export default userController;
