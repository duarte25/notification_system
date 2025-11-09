import Usuario, { ICriarUsuario, IUsuario } from "../models/Usuario";
import { PaginateResult } from "mongoose";

export default class UsuarioRepository {

  static async criarUsuario(data: ICriarUsuario) {
    return await Usuario.create(data);
  }

  static async atualizarUsuario(id: string, data: Partial<ICriarUsuario>): Promise<IUsuario | null> {
    return await Usuario.findByIdAndUpdate(id, data, { new: true });
  }

  static async listarUsuarios(filtro: any = {}, page = 1, limit = 10): Promise<PaginateResult<IUsuario>> {
    return await Usuario.paginate(filtro, {
      page,
      limit,
      sort: { _id: -1 },
      lean: true,
    });
  }

  static async listarUsuarioID(id: string): Promise<IUsuario | null> {
    return await Usuario.findById(id);
  }

  static async deletarUsuarioID(id: string): Promise<IUsuario | null> {
    return await Usuario.findByIdAndDelete(id);
  }
}
