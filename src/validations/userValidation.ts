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
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  role: Joi.string().valid(...Object.values(Roles)),
  name: Joi.string().min(3).max(50),
  email: Joi.string(),
  isVerified: Joi.boolean(),
  createdAt_from: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    .messages({
      "string.pattern.base":
        "Date must be in the ISO 8601 format YYYY-MM-DDTHH:mm:ss.sssZ",
    }),
  createdAt_to: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    .messages({
      "string.pattern.base":
        "Date must be in the ISO 8601 format YYYY-MM-DDTHH:mm:ss.sssZ",
    }),
});
