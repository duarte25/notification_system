
import Notificacao, { ICriarNotificacao, INotificacao } from '../models/Notificacao';
import { ValidationFuncs as v, Validation } from "../middlewares/Validation";
import NotificacaoRepository from '../Repository/NotificacaoRepository';
import { APIError } from "../utils/wrapException";
import Usuario from "../models/Usuario";


export default class NotificacaoService {
  static async criarNotificacao(notificacaoData: ICriarNotificacao): Promise<INotificacao> {

    const val = new Validation(notificacaoData);

    await val.validate("usuario_id", v.required(), v.mongooseID(),
      v.toMongooseObj({ model: Usuario, query: { _id: notificacaoData.usuario_id } }),
      v.exists({ model: Usuario, query: { id: notificacaoData.usuario_id } }));

    await val.validate("mensagem", v.required(), v.validateLength({ max: 1256 }));

    if (val.anyErrors()) throw new APIError(val.getErrors(), 422);

    const sanitizedData = val.getSanitizedBody();

    return await NotificacaoRepository.criarNotificacao(sanitizedData);
  }

  static async listarNotificacao(params: { id?: string, page?: number, limit?: number }) {

    const { id, page, limit } = params;

    const filtros: Record<string, any> = {};

    if (id) filtros.usuario_id = id;

    return await NotificacaoRepository.listarNotificacao(filtros, page, limit);
  }

  static async marcarComoLidaNotificacao(id: string) {

    const uuidPrismaTest = v.toMongooseObj({ model: Notificacao, query: { _id: id } })

    if (!uuidPrismaTest) throw new APIError(uuidPrismaTest, 404);

    const result = await NotificacaoRepository.marcarComoLidaNotificacao(id);

    if (!result) throw new APIError("Notificacao não encontrada.", 404);

    return result;
  }

  static async deletarNotificacao(id: string) {

    const uuidPrismaTest = v.toMongooseObj({ model: Notificacao, query: { _id: id } })

    if (!uuidPrismaTest) throw new APIError(uuidPrismaTest, 404);

    const result = await NotificacaoRepository.deletarNotificacao(id);

    if (!result) throw new APIError("Notificacao não encontrada.", 404);

    return result;

  }
}
