import joi from "joi";

export const produtoBodySchema = joi.object().keys({
  pro_nome: joi.string().trim().required().min(3).max(255),
  pro_descricao: joi.string().trim().required(),
  tipo_pro_id: joi.number().required()
});