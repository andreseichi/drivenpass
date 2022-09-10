import joi from "joi";

export const cardSchema = joi.object({
  title: joi.string().trim().required(),
  number: joi.string().length(16).trim().required(),
  placeholderName: joi.string().trim().required(),
  securityCode: joi.string().length(3).trim().required(),
  expirationDate: joi
    .string()
    .length(5)
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "numbers")
    .trim()
    .required(),
  password: joi.string().trim().required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().trim().valid("credit", "debit", "both").required(),
});
