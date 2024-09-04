import api from "../api";

export interface CompraDataStore {
  com_data_compra: string;
  itens_compra: Array<{
    pro_id: number;
    itens_com_quantidade: number;
    itens_com_valor: number;
  }>
}

export interface CompraData {
  com_id: number;
  com_data_compra: string;
  com_valor_total: string;
}

export interface CompraItemData {
  com_id: number;
  com_data_compra: string;
  itens_compra: Array<{
    pro_id: number;
    itens_com_quantidade: number;
    itens_com_valor: number;
  }>
}

class CompraService {

  static async getAll() {
    const response = await api.get('/compras');
    return response.data;
  }

  static async getById(id: number) {
    const response = await api.get('/compras/' + id);
    return response.data;
  }

  static async save(id: number, data: CompraDataStore) {
    const response = await api.put('/compras/' + id, data);
    return response.status;
  }

  static async remove(id: number) {
    const response = await api.delete('/compras/' + id);
    return response.status;
  }

  static async create(data: CompraDataStore) {
    const response = await api.post('/compras', data);
    return response.status;
  }

}

export default CompraService;