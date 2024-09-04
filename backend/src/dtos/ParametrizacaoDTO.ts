export interface ParametrizacaoIn {
  par_logo_grande: string,
  par_logo_pequena: string,
  par_cor_primaria: string,
  par_cor_secundaria: string,
  par_cor_terciaria: string,
  par_cor_neutra_clara: string,
  par_cor_neutra_media: string,
  par_cor_neutra_escura: string
}

export interface ParametrizacaoOut extends ParametrizacaoIn {
  par_id: number
}