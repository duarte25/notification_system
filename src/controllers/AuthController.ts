import { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";
import messages from "../utils/mensagens";

export default class AuthController {

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, senha } = req.body;

      // Chamar o service para realizar a validação e autenticação
      const result = await AuthService.login(email, senha);

      // Retornar sucesso com o token e os dados do usuário
      res.status(200).json({
        data: result,
        error: false,
        code: 200,
        message: messages.httpCodes[200],
        errors: [],
      });
    } catch (err: unknown) {
      // Tratar erros lançados pelo service
      if (err instanceof Error) {
        res.status(400).json({
          data: [],
          error: true,
          code: 400,
          message: messages.httpCodes[400],
          errors: [err.message],
        });
      } else {
        res.status(500).json({
          data: [],
          error: true,
          code: 500,
          message: messages.httpCodes[500],
          errors: ["Erro desconhecido."],
        });
      }
    }
  }
}