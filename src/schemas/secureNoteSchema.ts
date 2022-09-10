import joi from "joi";

export const secureNoteSchema = joi.object({
  title: joi.string().trim().max(50).required(),
  note: joi.string().trim().max(1000).required(),
});
