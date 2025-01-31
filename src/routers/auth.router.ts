import { Router } from "express";
import authController from "../controllers/auth.controller";
import joiMiddleWare from "../middlewares/joiMiddleware";
import {
  singupValidationSchema,
  loginValidationSchema,
  verifyUserSchema,
} from "../validations/authValidation";
import auth from "../middlewares/auth";

const router = Router();

router.post(
  "/signup",
  joiMiddleWare(singupValidationSchema),
  authController.signup
);

router.post(
  "/login",
  joiMiddleWare(loginValidationSchema),
  authController.login
);

router.get("/send-otp", auth, authController.sendVerificationEmail);

router.post(
  "/verify-user",
  auth,
  joiMiddleWare(verifyUserSchema),
  authController.verifyUser
);

export default router;
