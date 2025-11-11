const authSchemas = {
  TokenPayload: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        description: "ID do usuário"
      },
      nome: {
        type: "string",
        description: "Nome de Exibição do usuário"
      }
    },
  },
  RespostaLogin: {
    type: "object",
    properties: {
      token: {
        type: "string",
        description: "Token JWT para autenticação",
        example: "EXEMPLODETOKENEXEMPLODETOKENEXEMPLODETOKENEXEMPLODETOKENEXEMPLODETOKENQUEMLEUECORNOEXEMPLODETOKENEXEMPLODETOKENEXEMPLODETOKENEXEMPLODETOKENEXEMPLODETOKEN"
      },
      usuario: {
        $ref: "#/components/schemas/UsuarioGET"
      }
    }
  },
  LoginPOST: {
    type: "object",
    required: ["email", "senha"],
    properties: {
      email: {
        type: "string",
        description: "E-mail do usuário",
        example: "admin@gmail.com"
      },
      senha: {
        type: "string",
        description: "Senha do usuário",
        example: "Dev@1234"
      }
    }
  }
};

export default authSchemas;