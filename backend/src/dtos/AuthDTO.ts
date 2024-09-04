export interface AuthLoginIn {
  email: string,
  senha: string
};

export interface AuthLoginOut {
  usu_id: number,
  pes_id: number,
  ts_id: number,
  tp_id: number
}