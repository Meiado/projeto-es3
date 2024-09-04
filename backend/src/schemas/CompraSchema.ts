import joi from "joi";

export const compraBodySchema = joi.object({
  com_data_compra: joi.string().trim().required(),
  // pes_id: joi.number().required(),
  itens_compra: joi.array().min(1).items(joi.object({
    pro_id: joi.number().required(),
    itens_com_quantidade: joi.number().min(1).required(),
    itens_com_valor: joi.number().min(0.01).required()
  })).required()
});