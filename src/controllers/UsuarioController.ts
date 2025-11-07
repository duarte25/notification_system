import Usuario, { ICriarUsuario, IUsuario } from "../models/Usuario";
import UsuarioService from "../services/UsuarioService";
import { sendResponse } from "../utils/mensagens";
import { Request, Response } from "express";
import { paginateOptions } from "./common";

interface QueryParams {
  pagina?: string;
  limite?: string;
  nome?: string;
  email?: string;
}

export default class UsuarioController {

  // Método para criar usuário
  static async CriarUsuario(req: Request, res: Response): Promise<void> {
    // Criptografando a senha
    const dados: ICriarUsuario = { ...req.body };

    // Salvando o usuário
    const result = await UsuarioService.criarUsuario(dados);

    sendResponse(res, 201, { data: result });
  }

  // Método para listar usuários
  static async listarUsuario(req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response> {
    const pagina = parseInt(req.query.pagina ?? "1");
    const limite = parseInt(req.query.limite ?? paginateOptions.limit.toString());

    const { nome, email } = req.query;

    const usuarios = await UsuarioService.listarUsuarios({ nome, email, pagina, limite });

    return sendResponse(res, 200, {
      data: {
        usuarios: usuarios.docs,
        paginacao: {
          total: usuarios.totalDocs,
          paginas: usuarios.totalPages,
          paginaAtual: usuarios.page,
          limite: usuarios.limit,
        },
      },
    });
  }

  static async listarUsuarioID(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findUser = await UsuarioService.listarUsuarioID(id);

    return sendResponse(res, 200, { data: findUser });
  }

  static async alterarUsuario(req: Request, res: Response): Promise<IUsuario> {

    const { id } = req.params;

    const usuarioData: Partial<ICriarUsuario> = { ...req.body };

    const result = await UsuarioService.alterarUsuario(id, usuarioData);

    return sendResponse(res, 200, { data: result });
  }

  // Método para deletar um usuário
  static async deletarUsuario(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findUser = await Usuario.findByIdAndDelete(id);

    return sendResponse(res, 200);
  }
}