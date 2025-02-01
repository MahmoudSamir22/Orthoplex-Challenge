import { Router } from "express";
import userReportsController from "../controllers/userReports.controller";
import joiMiddleWare from "../middlewares/joiMiddleware";
import { querySchema, inactiveUsersSchema } from "../validations/userReportsValidation";
import auth from "../middlewares/auth";
import authorization from "../middlewares/authorization";
import { Roles } from "../enums/Roles";

const router = Router();

router.use(auth, authorization(Roles.ADMIN));

router.get(
  "/top-login-frequency",
  joiMiddleWare(querySchema, "query"),
  userReportsController.topLoginFrequency
);

router.get(
  "/inactive-users",
  joiMiddleWare(inactiveUsersSchema, "query"),
  userReportsController.inactiveUsers
);

export default router;
