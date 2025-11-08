
import Notificacao, { ICriarNotificacao, INotificacao } from '../models/Notificacao';
import { PaginateResult } from 'mongoose';

export default class NotificacaoRepository {
  static async criarNotificacao(data: ICriarNotificacao): Promise<INotificacao> {
    return await Notificacao.create(data);
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
    return await Notificacao.findByIdAndUpdate(
      id, { lida: true }, { new: true } 
    );
  }

  static async deletarNotificacao(id: string): Promise<INotificacao | null> {
    return await Notificacao.findByIdAndDelete(id);
  }
}
