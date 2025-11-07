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
    const pagina = parseInt(req.query.pagina as string) || 1;
    const limite = parseInt(req.query.limite as string) || paginateOptions.limit;
    const { nome, email } = req.query;

    // Filtros para a pesquisa
    const filtros: Record<string, any> = {};

    if (nome) {
      filtros.$text = {
        $search: nome,
        $caseSensitive: false,
        $diacriticSensitive: false,
        $language: "pt"
      };
    }

    if (email) filtros.email = email;

    const usuario = await Usuario.paginate(
      filtros,
      {
        ...paginateOptions,
        page: pagina,
        limit: limite,
        sort: { _id: -1 },
        lean: true,
      }
    );

    return sendResponse(res, 200, { data: usuario });
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