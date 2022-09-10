import joi from "joi";

export const networkSchema = joi.object({
  title: joi.string().required(),
  name: joi.string().trim().max(50).required(),
  password: joi.string().trim().required(),
});
