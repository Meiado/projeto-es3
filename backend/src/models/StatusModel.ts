import prisma from "../prisma";
import { StatusOut } from "../dtos/StatusDTO";

export default class StatusModel {
  
  static async getAll(): Promise<Array<StatusOut>> {
    const status = await prisma.tipoStatus.findMany();
    return status;
  }

  static async getById(ts_id: number): Promise<StatusOut|null> {
    const status = await prisma.tipoStatus.findUnique({ where: { ts_id: ts_id } });
    return status;
  }

}