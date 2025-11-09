
import NotificacaoService from '../services/NotificacaoService';
import { ICriarNotificacao } from '../models/Notificacao';
import { sendResponse } from '../utils/mensagens';
import { Request, Response } from 'express';
import { paginateOptions } from "./common";

interface QueryParams {
  page?: string;
  limit?: string;
}

export default class NotificacaoController {
  static async criarNotificacao(req: Request, res: Response) {
    const dados: ICriarNotificacao = { ...req.body };

    const notificacao = await NotificacaoService.criarNotificacao(dados);

    sendResponse(res, 201, { data: notificacao });
  }

  static async listarNotificacao(req: Request<{ id?: string }, {}, {}, QueryParams>, res: Response) {

    const { id } = req.params;

    const page = parseInt(req.query.page ?? "1");
    const limit = parseInt(req.query.limit ?? paginateOptions.limit.toString());

    const notificacoes = await NotificacaoService.listarNotificacao({ id, page, limit });

    sendResponse(res, 200, { data: notificacoes });
  }

  static async getContagemNaoLidas(req: Request, res: Response) {
    const { id } = req.params;
    const result = await NotificacaoService.getContagemNaoLidas(id);
    return sendResponse(res, 200, { data: result });
  }

  static async marcarComoLidaNotificacao(req: Request, res: Response) {
    const { id } = req.params;
    const result = await NotificacaoService.marcarComoLidaNotificacao(id)

    sendResponse(res, 200, { data: result });
  }

  static async deletarNotificacao(req: Request, res: Response) {
    const { id } = req.params;
    const result = await NotificacaoService.deletarNotificacao(id);

    sendResponse(res, 200, { data: result });
  }
}