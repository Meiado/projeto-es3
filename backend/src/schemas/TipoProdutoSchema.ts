import joi from "joi";

export const tipoProdutoBodySchema = joi.object().keys({
  tipo_pro_nome: joi.string().trim().required().min(3).max(60),
});