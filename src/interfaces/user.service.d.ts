import IUser from "../types/user";

export default interface IUserService {
    getProfile(id: string): Promise<IUser>;
    updateProfile(id: string, data: IUser): Promise<IUser>;
    deleteProfile(id: string): Promise<IUser>;
}