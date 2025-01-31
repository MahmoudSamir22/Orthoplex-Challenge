import Joi from "joi";
import { UpdateUser, UserQuery } from "../types/user";
import { Roles } from "../enums/Roles";

export const updateProfileSchema = Joi.object<UpdateUser>().keys({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
});

export const updateUserSchema = Joi.object<UpdateUser>().keys({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  role: Joi.string().valid(...Object.values(Roles)),
});

export const getUsersQuerySchema = Joi.object<UserQuery>().keys({
  role: Joi.string().valid(...Object.values(Roles)),
  name: Joi.string().min(3).max(50),
  email: Joi.string(),
  isVerified: Joi.boolean(),
  createdAt_from: Joi.date(),
  createdAt_to: Joi.date(),
});
