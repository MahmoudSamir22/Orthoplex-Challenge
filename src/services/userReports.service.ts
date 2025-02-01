import prisma from "../../prisma/client";
import IUserReportsService from "../interfaces/userReports.service";
import { QueryType } from "../types/query";
import { InactiveUsersQuery } from "../types/user";
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

  async inactiveUsers(query: InactiveUsersQuery) {
    return paginate("user", {
      where: {
        deletedAt: null,
        lastSeen: {
          lte: query.lastSeen ?? new Date(Date.now() - 60 * 60 * 1000), // Default to 1 hour ago
        },
      },
    }, query.page, query.limit);
  }
}

const userReportsService = new UserReportsService();
export default userReportsService;