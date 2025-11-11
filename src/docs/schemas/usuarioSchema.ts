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
  UsuarioPopulatedGET: {
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
  }
};

export default usuarioSchemas;
