export default interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;

  User_Codes?: User_Codes | null;
}

interface User_Codes {
    userId: string;
    verify_email_code: string | null;
    verify_email_expires: Date | null;
}