import Usuario, { ICriarUsuario, IUsuario } from "../models/Usuario";

export default class UsuarioRepository {

  static async criarUsuario(data: ICriarUsuario) {
    return await Usuario.create(data);
  }

  static async atualizarUsuario(id: string, data: Partial<ICriarUsuario>): Promise<IUsuario | null> {
    return await Usuario.findByIdAndUpdate(id, data, { new: true });
  }

  static async listarUsuarios(filtro: any = {}) {
    return await Usuario.find(filtro);
  }

  static async listarUsuarioID(id: string) {
    return await Usuario.findById(id);
  }

  static async deletarUsuario(id: string) {
    return await Usuario.findByIdAndDelete(id);
  }
}
