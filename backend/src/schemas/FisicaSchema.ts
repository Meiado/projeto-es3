import joi from "joi";

export const fisicaBodySchema = joi.object().keys({
  pes_nome: joi.string().trim().required().min(3).max(255),
  pes_email: joi.string().trim().email().required(),
  pes_telefone: joi.string().trim().min(8).max(20).regex(/^\d+$/).required(),
  pes_logradouro: joi.string().trim().max(255).required(),
  pes_complemento: joi.string().trim().allow('').optional(),
  pes_numero: joi.string().trim().max(10).required(),
  pes_bairro: joi.string().trim().max(100).required(),
  est_sigla: joi.string().trim().length(2).required(),
  cid_nome: joi.string().trim().required(),
  pes_status: joi.boolean().required(),
  fis_cpf: joi.string().trim().length(11).pattern(/^\d+$/).required(),
  fis_rg: joi.string().trim().length(9).regex(/^\d+$/).required(),
  sex_id: joi.number().required(),
  fis_data_nascimento: joi.date().required(),
});
