import Joi from "joi";
import { Signup, Login } from "../types/auth";

export const singupValidationSchema = Joi.object<Signup>().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
});

export const loginValidationSchema = Joi.object<Login>().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
