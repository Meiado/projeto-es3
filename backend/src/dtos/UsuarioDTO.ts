export interface UsuarioIn {
  usu_senha: string,
  usu_foto: string,
  pes_id: number,
  tp_id: number,
  ts_id: number
};

export interface UsuarioOut {
  usu_id: number,
  usu_senha: string,
  usu_foto: string,
  pes_id: number,
  tp_id: number,
  ts_id: number
}