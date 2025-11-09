import { ICriarUsuario, IUsuario } from "../models/Usuario";
import UsuarioService from "../services/UsuarioService";
import { sendResponse } from "../utils/mensagens";
import { Request, Response } from "express";
import { paginateOptions } from "./common";

interface QueryParams {
  page?: string;
  limit?: string;
  nome?: string;
  email?: string;
}

export default class UsuarioController {

  // Método para criar usuário
  static async CriarUsuario(req: Request, res: Response): Promise<void> {
    
    const dados: ICriarUsuario = { ...req.body };

    // Salvando o usuário
    const result = await UsuarioService.criarUsuario(dados);

    sendResponse(res, 201, { data: result });
  }

  // Método para listar usuários
  static async listarUsuario(req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response> {
    const page = parseInt(req.query.page ?? "1");
    const limit = parseInt(req.query.limit ?? paginateOptions.limit.toString());

    const { nome, email } = req.query;

    const usuarios = await UsuarioService.listarUsuarios({ nome, email, page, limit });

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

    const result = await UsuarioService.deletarUsuarioID(id);

    return sendResponse(res, 200, { data: result });
  }
}