import { FastifyReply, FastifyRequest } from "fastify";
import { DoacaoBody, DoacaoOut, DoacaoOutBody } from "../dtos/DoacaoDTO";
import DoacaoModel from "../models/DoacaoModel";
import { joiOptions } from "../schemas";
import { doacaoBodySchema } from "../schemas/DoacaoSchema";
import PessoaModel from "../models/PessoaModel";
import AppError from "../utils/AppError";
import prisma from "../prisma";
import ProdutoModel from "../models/ProdutoModel";
import { ItemDoacaoBody, ItemDoacaoIn } from "../dtos/ItensDoacaoDTO";
import ItemDoacaoModel from "../models/ItemDoacaoModel";

export default class DoacaoController {
    static async getById(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
        const id = Number(req.params.id);
        const doacao = await DoacaoModel.getById(id);
        if(doacao) {
          const itensDoacao = await ItemDoacaoModel.findByDoacaoId(id);
          const doacaoBody: DoacaoBody = {
            ...doacao,
            itens_doacao: itensDoacao
          };
          res.send(doacaoBody);
        } else {
          res.code(404).send("Doação não encontrada.");
        }
      }
      
    static async getAll(req: FastifyRequest, res: FastifyReply) {
      let doacoesOut: DoacaoOutBody[] = [];
      const doacoes = await DoacaoModel.getAll();
      for(const doacao of doacoes) {
        const itens = await ItemDoacaoModel.findByDoacaoId(doacao.doa_id);
        const doacaoOut: DoacaoOutBody = {
          doa_id: doacao.doa_id,
          doa_data: doacao.doa_data,
          doa_dinheiro: doacao.doa_dinheiro,
          pes_id_doador: doacao.pes_id_doador,
          itens_doacao: itens
        }
        doacoesOut.push(doacaoOut);
      }
      res.send(doacoesOut);
    }

    static async create(req: FastifyRequest<{ Body: DoacaoBody }>, res: FastifyReply) {
        await doacaoBodySchema.validateAsync(req.body, joiOptions);
        const data = req.body;
      
        if(!data.doa_dinheiro && (!data.itens_doacao || data.itens_doacao.length === 0))
          throw new AppError("A doação deve ter dinheiro ou itens", 400);
      
        let itensDoacaoData: Array<ItemDoacaoBody> = [];
        if(data.itens_doacao) {
          itensDoacaoData = await Promise.all(
            data.itens_doacao.map(async item => {
              const produto = await ProdutoModel.getById(item.pro_id);
              if (!produto)
                throw new AppError(`Nenhum produto com ID ${item.pro_id} existe`, 400);
      
              const itemData: ItemDoacaoBody = {
                pro_id: item.pro_id,
                itens_doa_quantidade: item.itens_doa_quantidade,
                itens_doa_especificacao: item.itens_doa_especificacao,
              };
              return itemData;
            })
          );
        }

        let doacao = {
          doa_data: new Date(data.doa_data),
              doa_dinheiro: data.doa_dinheiro,
              itens_doacao: {
                  create: itensDoacaoData,
              },
        }
        
        if(data.pes_id_doador) {
          const pessoa = await PessoaModel.getById(data.pes_id_doador);
          if(!pessoa)
            throw new AppError("Pessoa não encontrada", 400);
          doacao = {
            ...doacao,
            pes_id_doador: data.pes_id_doador,
          }
        }

        const novaDoacao = prisma.doacao.create({
          data: doacao
        });

        const atualizacoesEstoque = itensDoacaoData.map(item => {
          const estoque = item.itens_doa_especificacao === 'ONG' ? 'pro_estoque_ong' : 'pro_estoque_doacoes';
          return prisma.produto.update({
              where: { pro_id: item.pro_id },
              data: {
                  [estoque]: {
                      increment: item.itens_doa_quantidade
                  }
              }
          });
      });
      
      const result = await prisma.$transaction([novaDoacao, ...atualizacoesEstoque]);
      return result[0];
  }

  static async delete(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
    const id = Number(req.params.id);
  
    const doacao = await prisma.doacao.findUnique({ where: { doa_id: id } });
    if (!doacao) throw new AppError('Doação não encontrada', 404);
  
    const itens = await prisma.itensDoacao.findMany({ where: { doa_id: id } });
  
    const atualizacoesEstoque = itens.map(item => {
      const estoque = item.itens_doa_especificacao === 'ONG' ? 'pro_estoque_ong' : 'pro_estoque_doacoes';
      return prisma.produto.update({
        where: { pro_id: item.pro_id },
        data: {
          [estoque]: {
            decrement: item.itens_doa_quantidade
          }
        }
      });
    });
  
    const deletarItensDoacao = prisma.itensDoacao.deleteMany({ where: { doa_id: id } });

    const deletarDoacao = prisma.doacao.delete({ where: { doa_id: id } });
  
    const result = await prisma.$transaction([
      ...atualizacoesEstoque,
      deletarItensDoacao,
      deletarDoacao
    ]);
  
    res.send(result[result.length - 1]);
  }
  
}