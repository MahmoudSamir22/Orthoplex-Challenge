import { Request, Response, NextFunction } from "express";
import response from "../utils/response";
import authService from "../services/auth.service";
import signToken from "../utils/signToken";
import CustomRequest from "../interfaces/customRequest";

class AuthController {
  /**
   * @desc    Sing Up New User
   * @route   POST /api/auth/signup
   * @access  Public
   * @param   {Object} req - The request object. Expected body: { name, email, password }
   * @throws  {Error} If user email already exists.
   */
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.signup(req.body);
      response(res, 201, {
        status: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Login User
   * @route   POST /api/auth/login
   * @access  Public
   * @param   {Object} req - The request object. Expected body: { email, password }
   * @throws  {Error} If user email or password is invalid.
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.login(req.body);
      const tokens = signToken(user);
      response(res, 200, {
        status: true,
        message: "User logged in successfully",
        data: {
          ...tokens,
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

}

const authController = new AuthController();
export default authController;
