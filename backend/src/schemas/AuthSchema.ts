import joi from "joi";

export const authLoginSchema = joi.object().keys({
  email: joi.string().trim().email().required(),
  senha: joi.string().trim().required()
});