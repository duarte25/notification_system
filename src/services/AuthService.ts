
import AuthRepository from "../repository/AuthRepository";
import { APIError } from "../utils/wrapException";
import jwt, { SignOptions } from "jsonwebtoken";
import emailValidate from "../utils/mascaras";
import messages from "../utils/mensagens";
import { StringValue } from "ms";
import bcrypt from "bcryptjs";

export default class AuthService {
  static async login(email: string, senha: string) {
    // Validar o formato do email
    if (!emailValidate(email)) {
      throw new APIError(messages.customValidation.invalidMail);
    }

    // Verificar se o usuário existe no banco
    const userExist = await AuthRepository.findUserByEmail(email);

    if (!userExist) {
      throw new APIError("Usuário ou senha incorretos!");
    }

    // Verificar se o campo de senha está definido
    if (!userExist.senha) {
      throw new APIError("Erro interno: senha do usuário não encontrada!");
    }

    // Comparar a senha fornecida com a senha armazenada
    const senhaCorreta = await bcrypt.compare(senha, userExist.senha);
    if (!senhaCorreta) {
      throw new APIError("Usuário ou senha incorretos!");
    }

    // Verificar se JWT_SECRET está definido
    if (!process.env.JWT_SECRET) {
      throw new APIError("JWT_SECRET não está definido nas variáveis de ambiente!");
    }

    // Definir opções para o token JWT
    const jwtOptions: SignOptions = {
      expiresIn: (process.env.JWT_EXPIREIN || "1h") as StringValue, // Usar StringValue
    };

    // Gerar token JWT
    const token = jwt.sign(
      {
        _id: userExist._id,
        nome: userExist.nome,
        email: userExist.email,
      },
      process.env.JWT_SECRET,
      jwtOptions 
    );

    return {
      token,
      usuario: {
        _id: userExist._id,
        nome: userExist.nome,
        email: userExist.email
      },
    };
  }
}