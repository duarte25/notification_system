
import Notificacao, { ICriarNotificacao, INotificacao } from '../models/Notificacao';
import redisClient from '../config/db_redis';
import { PaginateResult } from 'mongoose';

export default class NotificacaoRepository {
  static async criarNotificacao(data: ICriarNotificacao): Promise<INotificacao> {
    const novaNotificacao = await Notificacao.create(data);

    await redisClient.incr(`unread_count:${novaNotificacao.usuario_id.toString()}`);

    return novaNotificacao;
  }

  static async listarNotificacao(filtro: any = {}, page = 1, limit = 10): Promise<PaginateResult<INotificacao>> {
    return await Notificacao.paginate(filtro, {
      page,
      limit,
      sort: { _id: -1 },
      lean: true,
    });
  }

  static async marcarComoLidaNotificacao(id: string): Promise<INotificacao | null> {

    const antiga = await Notificacao.findById(id);
    if (!antiga) return null;

    const notificacaoAtualizada = await Notificacao.findByIdAndUpdate(
      id,
      { lida: true },
      { new: true }
    );

    if (!antiga.lida) {
      await redisClient.decr(`unread_count:${antiga.usuario_id.toString()}`);
    }

    return notificacaoAtualizada;
  }

  static async deletarNotificacao(id: string): Promise<INotificacao | null> {
    const antiga = await Notificacao.findById(id);
    if (!antiga) return null;

    const removida = await Notificacao.findByIdAndDelete(id);

    if (antiga && !antiga.lida) {
      await redisClient.decr(`unread_count:${antiga.usuario_id.toString()}`);
    }

    return removida;
  }

  static async getContagemNaoLidas(usuarioId: string): Promise<number> {
    const count = await redisClient.get(`unread_count:${usuarioId}`);
    return Number(count) || 0;
  }
}
