import bcrypt from "bcrypt";
import prisma from "../client";

export default async function addAdminAccount() {
  try {
    const existedAdmin = await prisma.user.findFirst({
      where: {
        email: "admin@email.com",
      },
    });
    if (!existedAdmin) {
      await prisma.user.create({
        data: {
          email: "admin@email.com",
          password: await bcrypt.hash("T3st_P@s$w0rd", 10),
          role: "ADMIN",
          name: "Admin",
          isVerified: true,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}
