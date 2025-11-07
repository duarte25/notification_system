import { ValidationFuncs as v, Validation } from "../middlewares/Validation";
import Usuario, { ICriarUsuario, IUsuario } from "../models/Usuario";
import UsuarioRepository from "../Repository/UsuarioRepository";
import { APIError } from "../utils/wrapException";

export default class UsuarioService {

  static async criarUsuario(usuarioData: ICriarUsuario) {

    const val = new Validation(usuarioData);

    // Validações
    await val.validate("nome", v.required(), v.trim(), v.validateLength({ max: 50 }));
    await val.validate("email", v.required(), v.email(), v.unique({ model: Usuario, query: { email: usuarioData.email } }));

    if (val.anyErrors()) throw new APIError(val.getErrors(), 422);

    const sanitizedData = val.getSanitizedBody();

    const newUser = await UsuarioRepository.criarUsuario(sanitizedData);

    return newUser;
  }

  static async alterarUsuario(id: string, usuarioData: Partial<ICriarUsuario>): Promise<IUsuario | null> {

    let val = new Validation(usuarioData);

    val.body.id = id;

    // Validar id
    await val.validate("id",
      v.required(), v.mongooseID(), v.toMongooseObj({ model: Usuario, query: { _id: id } })
    );

    // Erro 404 quando id não existe
    if (val.anyErrors()) throw new APIError(val.getErrors(), 404);

    val = new Validation(usuarioData);

    await val.validate("nome", v.optional(), v.trim(), v.validateLength({ max: 50 }));

    await val.validate("email", v.optional(), v.email(), v.unique({
      model: Usuario, query: { email: usuarioData.email },
      ignoreSelf: true, userId: id
    }));

    if (val.anyErrors()) throw new APIError(val.getErrors(), 422);

    const sanitizedData = val.getSanitizedBody();

    const updatedUser = await UsuarioRepository.atualizarUsuario(id, sanitizedData);

    return updatedUser;
  }

  static async listarUsuarioID(id: string) {

    const uuidPrismaTest = v.toMongooseObj({ model: Usuario, query: { _id: id } })

    if (!uuidPrismaTest) throw new APIError(uuidPrismaTest, 404);

    const userData = await UsuarioRepository.listarUsuarioID(id);

    if (!userData) throw new APIError("Usuário não encontrado.", 404);

    return userData;
  }

}