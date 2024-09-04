import { FastifyRequest, FastifyReply } from "fastify";
import StatusModel from "../models/StatusModel";

export default class StatusController {

  static async getAll(req: FastifyRequest, res: FastifyReply): Promise<any> {
    const status = await StatusModel.getAll();
    res.code(200).send(status);
  }

}