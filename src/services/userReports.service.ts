import prisma from "../../prisma/client";
import IUserReportsService from "../interfaces/userReports.service";
import { QueryType } from "../types/query";
import { paginate } from "../utils/pagination";

class UserReportsService implements IUserReportsService {
  async topLoginFrequency(query: Partial<QueryType>) {
    return paginate(
      "user",
      {
        where: {
          deletedAt: null,
        },
        orderBy: {
          loginCount: "desc",
        },
      },
      query.page,
      query.limit || 3
    );
  }

  async inactiveUsers(query: Partial<QueryType>) {
    return paginate("user", {
      where: {
        deletedAt: null,
        lastLogin: {
          lte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
    }, query.page, query.limit);
  }
}

const userReportsService = new UserReportsService();
export default userReportsService;