import joi from "joi";

export const usuarioBodySchema = joi.object().keys({
  usu_senha: joi.string().trim().required().min(5).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]{5,}$')),
  usu_foto: joi.string().trim().required(),
  pes_id: joi.number().required(),
  tp_id: joi.number().required(),
  ts_id: joi.number().required()
});