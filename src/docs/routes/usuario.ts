import { respostaOK, respostaPaginadaOK } from "../config/docsUtils.js";

const usuarioPaths = {
  "/users": {
    get: {
      tags: ["Usuarios"],
      security: [{ bearerAuth: [] }],
      summary: "Retorna uma lista de usuários baseado na pesquisa.",
      description: `Retorna a lista de usuários.`,
      parameters: [
        {
          in: "query",
          name: "nome",
          description: "Procura por usuário com nome que atende aos termos pesquisados",
          required: false,
          schema: {
            type: "string"
          }
        },
        {
          in: "query",
          name: "email",
          description: "Procura por usuário com email que começar com o termo pesquisado",
          required: false,
          schema: {
            type: "string"
          }
        },
        {
          in: "query",
          name: "page",
          description: "page",
          required: false,
          schema: {
            type: "integer"
          }
        },
        {
          name: "limite",
          in: "query",
          description: "Informar o máixmo que será listado por página",
          required: false,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: respostaPaginadaOK(200, "Lista de usuários", "#/components/schemas/UsuarioLista")
    },
    post: {
      tags: ["Usuarios"],
      security: [{ bearerAuth: [] }],
      summary: "Cria um novo usuário (email e senha)",
      description: `Cria um usuário na API.`,
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UsuarioPOST"
            }
          }
        }
      },
      responses: respostaOK(201, "Usuário criado com sucesso", "#/components/schemas/UsuarioGET")
    }
  },
  "/users/{id}": {
    get: {
      tags: ["Usuarios"],
      security: [{ bearerAuth: [] }],
      summary: "Retorna um usuário",
      description: `Retorna um usuário da API baseado no ID informado<br>`,
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID do usuário",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      responses: respostaOK(200, "Resposta usuário", "#/components/schemas/UsuarioGET")
    },
    patch: {
      tags: ["Usuarios"],
      security: [{ bearerAuth: [] }],
      summary: "Atualiza um usuário",
      description: `Atualiza o usuário na API baseado no ID informado`,
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID do usuário",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UsuarioPATCH"
            }
          }
        }
      },
      responses: respostaOK(200, "Usuário atualizado com sucesso", "#/components/schemas/UsuarioGET")
    },
    delete: {
      tags: ["Usuarios"],
      security: [{ bearerAuth: [] }],
      summary: "Deleta um usuário",
      description: `Deleta o usuário na API baseado no ID informado`,
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID do usuário",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      responses: respostaOK(200, "Usuário deletado com sucesso", "#/components/schemas/UsuarioGET")
    }
  },
};

export default usuarioPaths;