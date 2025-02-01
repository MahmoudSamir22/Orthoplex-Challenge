import { PaginateType } from "../types/pagination";
import { QueryType } from "../types/query";
import IUser, { InactiveUsersQuery } from "../types/user";

export default interface IUserReportsService {
    topLoginFrequency(query: Partial<QueryType>): Promise<PaginateType<IUser>>;
    inactiveUsers(query: InactiveUsersQuery): Promise<PaginateType<IUser>>;
}