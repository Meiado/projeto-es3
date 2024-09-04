import { PessoaIn } from "./PessoaDTO";

export interface PessoaJuridicaIn extends PessoaIn {
  jur_cnpj: string,
  jur_razao_social: string,
  jur_url_site: string,
  jur_nome_fantasia: string
}

export interface JuridicaIn {
  pes_id: number,
  jur_cnpj: string,
  jur_razao_social: string,
  jur_url_site: string,
  jur_nome_fantasia: string
}

export interface JuridicaUpdate {
  jur_cnpj: string,
  jur_razao_social: string,
  jur_url_site: string,
  jur_nome_fantasia: string
}

export interface JuridicaOut {
  pes_id: number,
  jur_cnpj: string,
  jur_razao_social: string,
  jur_url_site: string,
  jur_nome_fantasia: string 
}