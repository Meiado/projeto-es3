import { Especificacao } from "@prisma/client";
import joi from "joi";

export const doacaoBodySchema = joi.object().keys({
  doa_data: joi.string().trim().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
  pes_id_doador: joi.number(),
  doa_dinheiro: joi.number().min(0).required(),
  itens_doacao: joi.array().items(joi.object({
    pro_id: joi.number().required(),
    itens_doa_quantidade: joi.number().min(1).required(),
    itens_doa_especificacao: joi.string().valid(...Object.values(Especificacao)).required(),
  })).when('doa_dinheiro', {
    is: joi.number().valid(0),
    then: joi.required(),
    otherwise: joi.optional()
  }),
}).or('doa_dinheiro', 'itens_doacao').required();
