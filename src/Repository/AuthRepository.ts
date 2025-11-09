import Usuario from "../models/Usuario";

export default class AuthRepository {
  static async findUserByEmail(email: string) {
    return await Usuario.findOne(
      { email },
      {
        id: 1, nome: 1, email: 1, senha: 1,
      }
    ).lean();
  }
}
