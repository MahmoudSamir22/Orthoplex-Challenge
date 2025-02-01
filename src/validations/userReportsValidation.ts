import Joi from "joi";
import { QueryType } from "../types/query";
import { InactiveUsersQuery } from "../types/user";

export const querySchema = Joi.object<QueryType>().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
});

export const inactiveUsersSchema = Joi.object<InactiveUsersQuery>().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  lastSeen: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    .messages({
      "string.pattern.base":
        "Date must be in the ISO 8601 format YYYY-MM-DDTHH:mm:ss.sssZ",
    }),
});
