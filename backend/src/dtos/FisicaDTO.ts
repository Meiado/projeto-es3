import { Pessoa } from "@prisma/client"
import { PessoaDataOut, PessoaIn, PessoaOut } from "./PessoaDTO"

export interface PessoaFisica extends Pessoa {
  fis_cpf: string,
  fis_rg: string,
  sex_id: number,
  fis_data_nascimento: Date
}

export interface PessoaFisicaIn extends PessoaIn {
  fis_cpf: string,
  fis_rg: string,
  sex_id: number,
  fis_data_nascimento: Date
}

export interface PessoaFisicaOut extends PessoaDataOut {
  fis_cpf: string,
  fis_rg: string,
  sex_id: number,
  fis_data_nascimento: Date
}

export interface FisicaIn {
  fis_cpf: string,
  fis_rg: string,
  sex_id: number,
  fis_data_nascimento: Date
}

export interface FisicaUpdate {
  fis_cpf: string,
  fis_rg: string,
  sex_id: number,
  fis_data_nascimento: Date
}

export interface FisicaOut {
  pes_id: number,
  fis_cpf: string,
  fis_rg: string,
  sex_id: number,
  fis_data_nascimento: Date
}