import joi from "joi";

export const juridicaBodySchema = joi.object().keys({
  pes_nome: joi.string().trim().required().min(3).max(255),
  pes_email: joi.string().trim().email().required(),
  pes_telefone: joi.string().trim().min(8).max(20).regex(/^\d+$/).required(),
  pes_logradouro: joi.string().trim().max(255).required(),
  pes_complemento: joi.string().trim().allow('').optional(),
  pes_numero: joi.string().trim().max(10).required(),
  pes_bairro: joi.string().trim().max(100).required(),
  cid_id: joi.number().required(),
  jur_cnpj: joi.string().length(14).regex(/^\d+$/).required(),
  jur_razao_social: joi.string().min(3).max(255).required(),
  jur_url_site: joi.string().allow('').max(255).required(),
  jur_nome_fantasia: joi.string().min(3).max(255).required()
});