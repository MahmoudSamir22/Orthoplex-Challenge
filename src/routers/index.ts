import { Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import userReportsRouter from "./userReports.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/users-reports", userReportsRouter);

export default router;