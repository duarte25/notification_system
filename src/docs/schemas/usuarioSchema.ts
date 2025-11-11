const usuarioSchemas = {
  UsuarioLogin: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID do usuário",
        example: "661031feb4850e0c367e54ab"
      },
      nome: {
        type: "string",
        description: "Nome do usuário",
        example: "Admin"
      },
      email: {
        type: "string",
        description: "E-mail do usuário",
        example: "admin@gmail.com"
      }
    }
  },
  UsuarioPOST: {
    type: "object",
    properties: {
      nome: {
        type: "string",
        description: "Nome do usuário",
        example: "Teste"
      },
      email: {
        type: "string",
        description: "E-mail do usuário",
        example: "teste@gmail.com"
      },
      senha: {
        type: "string",
        description: "Senha do usuário",
        example: "Dev@1234"
      }
    }
  },
  UsuarioPATCH: {
    type: "object",
    properties: {
      nome: {
        type: "string",
        description: "Nome do usuário",
        example: "Teste"
      },
      email: {
        type: "string",
        description: "E-mail do usuário",
        example: "teste@gmail.com"
      }
    }
  },
  UsuarioGET: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        description: "ID do usuário",
        example: "661031feb4850e0c367e54ab"
      },
      nome: {
        type: "string",
        description: "Nome do usuário",
        example: "Admin"
      },
      email: {
        type: "string",
        description: "E-mail do usuário",
        example: "admin@gmail.com"
      }
    }
  },
  UsuarioLista: {
    type: "object",
    properties: {
      usuarios: {
        type: "array",
        items: { $ref: "#/components/schemas/UsuarioGET" }
      },
      paginacao: {
        type: "object",
        properties: {
          total: { type: "integer", example: 50 },
          paginas: { type: "integer", example: 5 },
          paginaAtual: { type: "integer", example: 1 },
          limite: { type: "integer", example: 10 }
        }
      }
    }
  }

};

export default usuarioSchemas;
