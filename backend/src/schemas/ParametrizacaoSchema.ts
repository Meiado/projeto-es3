import joi from "joi";

export const parametrizacaoBodySchema = joi.object().keys({
  par_logo_grande: joi.string().uri().required(),
  par_logo_pequena: joi.string().uri().required(),
  par_cor_primaria: joi.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/).required(),
  par_cor_secundaria: joi.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/).required(),
  par_cor_terciaria: joi.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/).required(),
  par_cor_neutra_clara: joi.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/).required(),
  par_cor_neutra_media: joi.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/).required(),
  par_cor_neutra_escura: joi.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/).required(),
});