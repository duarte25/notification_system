
import Notificacao, { ICriarNotificacao, INotificacao } from '../models/Notificacao';
import { ValidationFuncs as v, Validation } from "../middlewares/Validation";
import NotificacaoRepository from '../repository/NotificacaoRepository';
import { APIError } from "../utils/wrapException";
import Usuario from '../models/Usuario';

export default class NotificacaoService {
  static async criarNotificacao(notificacaoData: ICriarNotificacao): Promise<INotificacao> {

    const val = new Validation(notificacaoData);

    // Para poder usar o mock não posso buscar antes para conferir se está tudo certo
    await val.validate("usuario_id", v.required(), )
    // v.mongooseID(),
    //   v.toMongooseObj({ model: Usuario, query: { _id: notificacaoData.usuario_id } })
      // v.exists({ model: Usuario, query: { id: notificacaoData.usuario_id } }));

    await val.validate("mensagem", v.required(), v.validateLength({ max: 1256 }));

    if (val.anyErrors()) throw new APIError(val.getErrors(), 422);

    const novaNotificacao = await NotificacaoRepository.criarNotificacao(val.getSanitizedBody());

    return novaNotificacao;
  }

  static async getContagemNaoLidas(usuarioId: string) {
    const val = new Validation({ usuarioId });
    await val.validate("usuarioId", v.required(), v.mongooseID());
    if (val.anyErrors()) throw new APIError(val.getErrors(), 400);

    const getContagemNaoLidas = await NotificacaoRepository.getContagemNaoLidas(usuarioId);

    return { contagem: getContagemNaoLidas };
  }

  static async listarNotificacao(params: { id?: string, page?: number, limit?: number }) {

    const { id, page, limit } = params;

    const filtros: Record<string, any> = {};

    if (id) filtros.usuario_id = id;

    return await NotificacaoRepository.listarNotificacao(filtros, page, limit);
  }

  static async marcarComoLidaNotificacao(id: string) {

    const val = new Validation({ id });
    await val.validate("id", v.required(), v.mongooseID());
    if (val.anyErrors()) throw new APIError(val.getErrors(), 400);

    const notificacaoAntiga = await Notificacao.findById(id);

    if (!notificacaoAntiga) throw new APIError("Notificação não encontrada.", 404);

    const result = await NotificacaoRepository.marcarComoLidaNotificacao(id);

    return result;
  }

  static async deletarNotificacao(id: string) {

    const val = new Validation({ id });
    await val.validate("id", v.required(), v.mongooseID());
    if (val.anyErrors()) throw new APIError(val.getErrors(), 400);

    const notificacaoParaDeletar = await Notificacao.findById(id);

    if (!notificacaoParaDeletar) throw new APIError("Notificacao não encontrada.", 404);

    await notificacaoParaDeletar.deleteOne();

    return notificacaoParaDeletar;
  }
}
