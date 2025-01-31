import { Request, Response, NextFunction } from "express";
import userReportsService from "../services/userReports.service";
import response from "../utils/response";

class UserReportsController {
  /**
   * @desc    Get list of users with login frequency
   * @route   GET /api/reports/login-frequency
   * @access  Private [Admin]
   */
  async topLoginFrequency(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, pagination } = await userReportsService.topLoginFrequency(req.query);
      response(res, 200, {
        status: true,
        message: "Users fetched successfully",
        pagination,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Get list of inactive users
   * @route   GET /api/reports/inactive-users
   * @access  Private [Admin]
   */
  async inactiveUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, pagination } = await userReportsService.inactiveUsers(req.query);
      response(res, 200, {
        status: true,
        message: "Users fetched successfully",
        pagination,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

const userReportsController = new UserReportsController();
export default userReportsController;