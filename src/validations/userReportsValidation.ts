import Joi from "joi";
import { QueryType } from "../types/query";

export const querySchema = Joi.object<QueryType>().keys({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
})