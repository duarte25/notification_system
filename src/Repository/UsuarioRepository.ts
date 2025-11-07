import Usuario, { ICriarUsuario, IUsuario } from "../models/Usuario";

export default class UsuarioRepository {

  static async criarUsuario(data: ICriarUsuario) {
    const novoUsuario = await Usuario.create(data);
    return novoUsuario;
  }

  static async atualizarUsuario(id: string, data: Partial<ICriarUsuario>): Promise<IUsuario | null> {
    return await Usuario.findByIdAndUpdate(id, data, { new: true });
  }

  static async listarUsuarios(filtro: any = {}) {
    const usuarios = await Usuario.find(filtro);
    return usuarios;
  }

  static async deletarUsuario(id: string) {
    const usuario = await Usuario.findByIdAndDelete(id);
    return usuario;
  }
}
