import { Router } from "express";
import authController from "../controllers/auth.controller";
import joiMiddleWare from "../middlewares/joiMiddleware";
import {
  singupValidationSchema,
  loginValidationSchema,
} from "../validations/authValidation";

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


export default router;
