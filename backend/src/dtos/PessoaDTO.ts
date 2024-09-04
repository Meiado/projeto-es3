export interface PessoaIn {
  pes_nome: string,
  pes_email: string,
  pes_telefone: string,
  pes_logradouro: string,
  pes_complemento: string,
  pes_numero: string,
  pes_bairro: string,
  est_sigla: string,
  cid_nome: string,
  pes_status: boolean
}

export interface PessoaData {
  pes_nome: string,
  pes_email: string,
  pes_telefone: string,
  pes_logradouro: string,
  pes_complemento: string,
  pes_numero: string,
  pes_bairro: string,
  cid_id: number,
  pes_status: boolean
}

export interface PessoaDataOut {
  pes_id: number,
  pes_nome: string,
  pes_email: string,
  pes_telefone: string,
  pes_logradouro: string,
  pes_complemento: string,
  pes_numero: string,
  pes_bairro: string,
  est_sigla: string,
  cid_nome: string,
  pes_status: boolean
}


export interface PessoaOut {
  pes_id: number,
  pes_nome: string,
  pes_email: string,
  pes_telefone: string,
  pes_logradouro: string,
  pes_complemento: string,
  pes_numero: string,
  pes_bairro: string,
  cid_id: number,
  pes_status: boolean
}