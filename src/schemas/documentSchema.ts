import joi from "joi";

export const documentSchema = joi.object({
  type: joi.string().trim().valid("RG", "CNH").required(),
  username: joi.string().trim().required(),
  emitionDate: joi
    .string()
    .length(10)
    .regex(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
      "numbers"
    )
    .trim()
    .required(),
  validate: joi
    .string()
    .length(10)
    .regex(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
      "numbers"
    )
    .trim()
    .required(),
  number: joi.string().trim().required(),
  emiter: joi.string().trim().required(),
});
