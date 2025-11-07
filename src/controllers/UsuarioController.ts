import messages, { sendResponse } from "../utils/mensagens";
import Usuario, { IUsuario } from "../models/Usuario";
import { Request, Response } from "express";
import { paginateOptions } from "./common";

// Interface para tipar o corpo da requisição
interface ICreateUserRequest {
  nome: string;
  email: string;
}

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
    const dados: ICreateUserRequest = { ...req.body };

    // Criando um novo usuário
    const usuario = new Usuario(dados);

    // Salvando o usuário
    const saveUser = await usuario.save();

    sendResponse(res, 201, saveUser);
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

    // Aqui você continua usando o paginateOptions para usar a configuração customizada de paginação
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

    // Retornando a resposta com os dados paginados
    return sendResponse(res, 200, { data: usuario });
  }

  // Método para listar um usuário por ID
  static async listarUsuarioID(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findUser = await Usuario.findById(id);

    return sendResponse(res, 200, { data: findUser });
  }

  // Método para alterar um usuário
  static async alterarUsuario(req: Request, res: Response): Promise<Response> {
    // Pega o usuário do validador
    const usuario = req.validateResult.usuario as IUsuario;
    const { senha } = req.body;

    // Só atualiza os campos que foram enviados
    for (let key in req.body) {
      // Garantir que estamos acessando apenas as chaves válidas do tipo IUsuario
      if (key in usuario) {
        // Acessa de forma segura as propriedades de usuario, usando keyof IUsuario
        (usuario as any)[key] = req.body[key]; // Usando any para contornar o erro do TypeScript
      }
    }

    await Usuario.findByIdAndUpdate(usuario._id, usuario);

    return res.status(200).json({ data: usuario });
  }

  // Método para deletar um usuário
  static async deletarUsuario(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findUser = await Usuario.findByIdAndDelete(id);

    return sendResponse(res, 200);
  }
}