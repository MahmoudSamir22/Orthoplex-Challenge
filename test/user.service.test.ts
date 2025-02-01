import userService from "../src/services/user.service";
import { prismaMock } from "./mocks/prismaMock";
import IUser, { UpdateUser } from "../src/types/user";

describe("User Service", () => {
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
    lastLogin: null,
  };
  describe("Get User Details", () => {
    test("should return user details", async () => {
      prismaMock.user.findUnique.mockResolvedValue(userResponse);

      await expect(userService.getUserDetails("1")).resolves.toEqual(
        userResponse
      );
    });
    test("should throw error if user does not exist", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(userService.getUserDetails("1")).rejects.toThrow(
        "User does not exist"
      );
    });
  });

  describe("Update User Details", () => {
    const updateUserDate: UpdateUser = {
      name: "Rich",
      email: "rich@email.com",
    };
    test("should update user details", async () => {
      prismaMock.user.findUnique.mockResolvedValue(userResponse);
      prismaMock.user.update.mockResolvedValue({
        ...userResponse,
        name: "Rich",
        email: "rich@email.com",
      });

      await expect(
        userService.updateUserDetails("1", updateUserDate)
      ).resolves.toEqual({
        ...userResponse,
        ...updateUserDate,
      });
    });
    test("should throw error if user does not exist", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        userService.updateUserDetails("1", updateUserDate)
      ).rejects.toThrow("User does not exist");
    });
  });

  describe("Delete User Details", () => {
    test("should delete user", async () => {
      prismaMock.user.findUnique.mockResolvedValue(userResponse);
      prismaMock.user.update.mockResolvedValue({
        ...userResponse,
        deletedAt: new Date(),
      });
      await expect(userService.deleteUserDetails("1")).resolves.toEqual({
        ...userResponse,
        deletedAt: expect.any(Date),
      });
    });
    test("should throw error if user does not exist", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(userService.deleteUserDetails("1")).rejects.toThrow(
        "User does not exist"
      );
    });
  });

  describe("Verify User", () => {
    test("should verify user", async () => {
      prismaMock.user.findFirst.mockResolvedValue({
        ...userResponse,
        isVerified: false,
      });
      prismaMock.user.update.mockResolvedValue({
        ...userResponse,
        isVerified: true,
      });
      await expect(userService.verifyUser("1")).resolves.toEqual(userResponse);
    });

    test("should throw error if user does not exist", async () => {
      prismaMock.user.findFirst.mockResolvedValue(null);

      await expect(userService.verifyUser("1")).rejects.toThrow(
        "User does not exist"
      );
    });
  });

  describe("Users Counters", () => {
    test("should return verified users counters", async () => {
      prismaMock.user.count.mockResolvedValue(10);

      await expect(userService.verifiedUserCount()).resolves.toEqual(10);
    });
    test("should return registered users counters", async () => {
      prismaMock.user.count.mockResolvedValue(20);

      await expect(userService.registeredUserCount()).resolves.toEqual(20);
    });
  });


  describe("Users List", () => {
    const usersList: IUser[] = [
      {
        id: "1a2b3c4d",
        name: "John Doe",
        email: "johndoe@example.com",
        password:
          "$2a$12$6/d5DGhgAgpOf.dEYUKkp.YUaCVLWpZNEuKrejLQFJRnUrgLE60PC", // HASHED VALUE OF "password"
        role: "ADMIN",
        deletedAt: null,
        createdAt: new Date("2024-01-15T08:30:00Z"),
        updatedAt: new Date("2024-07-01T12:45:00Z"),
        isVerified: true,
        loginCount: 42,
        lastLogin: new Date("2024-07-10T09:15:00Z"),
      },
      {
        id: "5e6f7g8h",
        name: "Jane Smith",
        email: "janesmith@example.com",
        password:
          "$2a$12$6/d5DGhgAgpOf.dEYUKkp.YUaCVLWpZNEuKrejLQFJRnUrgLE60PC", // HASHED VALUE OF "password"
        role: "USER",
        deletedAt: null,
        createdAt: new Date("2023-11-20T10:00:00Z"),
        updatedAt: new Date("2024-06-25T16:30:00Z"),
        isVerified: false,
        loginCount: 15,
        lastLogin: new Date("2024-06-20T14:00:00Z"),
      },
    ];
    test("should return list of users", async () => {
      prismaMock.user.findMany.mockResolvedValue(usersList);
      prismaMock.user.count.mockResolvedValue(usersList.length);
      await expect(
        userService.getUsersList({ page: 1, limit: 1 })
      ).resolves.toEqual({
        pagination: {
          total_pages: 2,
          total_records: usersList.length,
          page: 1,
          limit: 1,
        },
        data: usersList,
      });
    });
    test("should return list of filtered users", async () => {
      prismaMock["user"].findMany.mockResolvedValue([usersList[0]]);
      prismaMock["user"].count.mockResolvedValue(1);

      await expect(
        userService.getUsersList({ role: "ADMIN" })
      ).resolves.toEqual({
        pagination: {
          total_pages: 1,
          total_records: 1,
          page: 1,
          limit: 40,
        },
        data: [usersList[0]],
      });
    });
    test("should handle empty user list", async () => {
      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(0);

      await expect(userService.getUsersList({})).resolves.toEqual({
        pagination: {
          total_pages: 1, // Ensure it returns at least 1 page
          total_records: 0,
          page: 1,
          limit: 40,
        },
        data: [],
      });
    });
  });
});
