import { Router } from "express";
import userController from "../controllers/user.controller";
import joiMiddleWare from "../middlewares/joiMiddleware";
import auth from "../middlewares/auth";
import {
  updateProfileSchema,
  getUsersQuerySchema,
  updateUserSchema,
} from "../validations/userValidation";
import authorization from "../middlewares/authorization";
import { Roles } from "../enums/Roles";

const router = Router();

router.use(auth);

router.get(
  "/",
  authorization(Roles.ADMIN),
  joiMiddleWare(getUsersQuerySchema, "query"),
  userController.getProfile
);

router
  .route("/profile")
  .get(userController.getProfile)
  .patch(joiMiddleWare(updateProfileSchema), userController.updateProfile)
  .delete(userController.deleteProfile);

router
  .route("/:id")
  .get(authorization(Roles.ADMIN), userController.getUserDetails)
  .patch(
    authorization(Roles.ADMIN),
    joiMiddleWare(updateUserSchema),
    userController.updateUserDetails
  )
  .delete(authorization(Roles.ADMIN), userController.deleteProfile);

export default router;
