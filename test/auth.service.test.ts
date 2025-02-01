import { Login, Signup } from "../src/types/auth";
import { prismaMock } from "./mocks/prismaMock";
import authService from "../src/services/auth.service";
import IUser from "../src/types/user";

describe("Auth Service", () => {
  describe("signup", () => {
    const userResponse: IUser = {
      id: "1",
      name: "Rich",
      email: "hello@prisma.io",
      password: "$2a$12$6/d5DGhgAgpOf.dEYUKkp.YUaCVLWpZNEuKrejLQFJRnUrgLE60PC", // HASHED VALUE OF "password"
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      isVerified: true,
      role: "USER",
      loginCount: 0,
      lastSeen: null,
    };
    test("should signup new user ", async () => {
      const user: Signup = {
        name: "Rich",
        email: "hello@prisma.io",
        password: "password",
      };

      prismaMock.user.create.mockResolvedValue(userResponse);
      prismaMock.user.findFirst.mockResolvedValue(null);

      await expect(authService.signup(user)).resolves.toEqual(userResponse);
    });

    test("should not signup new user if email already exists", async () => {
      const user: Signup = {
        name: "Rich",
        email: "hello@prisma.io",
        password: "password",
      };
      prismaMock.user.findFirst.mockResolvedValue(userResponse);

      await expect(authService.signup(user)).rejects.toThrow(
        "Email is already in use"
      );
    });
  });

  describe("login", () => {
    const userResponse: IUser = {
      id: "1",
      name: "Rich",
      email: "hello@prisma.io",
      password: "$2a$12$6/d5DGhgAgpOf.dEYUKkp.YUaCVLWpZNEuKrejLQFJRnUrgLE60PC", // HASHED VALUE OF "password"
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      isVerified: true,
      role: "USER",
      loginCount: 0,
      lastSeen: null,
    };
    test("should login user", async () => {
      const loginData: Login = {
        email: "hello@prisma.io",
        password: "password",
      };
      prismaMock.user.findFirst.mockResolvedValue(userResponse);
      prismaMock.user.update.mockResolvedValue({
        ...userResponse,
        loginCount: userResponse.loginCount + 1,
        lastSeen: new Date(),
      });
      await expect(authService.login(loginData)).resolves.toEqual({
        ...userResponse,
        loginCount: 1,
        lastSeen: expect.any(Date),
      });
    });
    test("should not login user if email does not exist", async () => {
      const loginData: Login = {
        email: "hello@prisma.io",
        password: "password",
      };
      prismaMock.user.findFirst.mockResolvedValue(null);
      await expect(authService.login(loginData)).rejects.toThrow(
        "Invalid email or password"
      );
    });
    test("should not login user if password is incorrect", async () => {
      const loginData: Login = {
        email: "hello@prisma.io",
        password: "password123",
      };
      prismaMock.user.findFirst.mockResolvedValue(userResponse);
      await expect(authService.login(loginData)).rejects.toThrow(
        "Invalid email or password"
      );
    });
    test("should not login user if user is not verified", async () => {
      const loginData: Login = {
        email: "hello@prisma.io",
        password: "password",
      };
      prismaMock.user.findFirst.mockResolvedValue({
        ...userResponse,
        isVerified: false,
      });
      await expect(authService.login(loginData)).rejects.toThrow(
        "User is not verified"
      );
    });
  });
});
