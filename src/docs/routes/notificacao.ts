import { respostaOK, respostaPaginadaOK } from "../config/docsUtils.js";

const notificacaoPaths = {
  "/notifications": {
    post: {
      tags: ["Notificações"],
      security: [{ bearerAuth: [] }],
      summary: "Cria uma nova notificação (usuario_id e mensagem)",
      description: `Cria uma notificação na API.`,
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/NotificacaoPOST"
            }
          }
        }
      },
      responses: respostaOK(201, "Notificação criada com sucesso", "#/components/schemas/NotificacaoGET")
    }
  },
  "/notifications/{id}": {
    get: {
      tags: ["Notificações"],
      security: [{ bearerAuth: [] }],
      summary: "Retorna uma lista de notificações baseado no id do usuário.",
      description: `Retorna a lista de notificações.`,
      parameters: [
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
      responses: respostaPaginadaOK(200, "Lista de notificação", "#/components/schemas/NotificacaoLista")
    },
    delete: {
      tags: ["Notificações"],
      security: [{ bearerAuth: [] }],
      summary: "Deleta uma notificação",
      description: `Deleta a notifiação na API baseado no ID informado`,
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID da notificação",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      responses: respostaOK(200, "Notificação deletada com sucesso", "#/components/schemas/NotificacaoGET")
    }
  },
  "/notifications/{id}/read": {
    patch: {
      tags: ["Notificações"],
      security: [{ bearerAuth: [] }],
      summary: "Lê uma notificação",
      description: `Lê uma notificação da API baseado no ID informado <br>`,
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID da notificação",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      responses: respostaOK(200, "Resposta da notificação", "#/components/schemas/NotificacaoGET")
    },
  },
  "/notifications/{id}/unread": {
    get: {
      tags: ["Notificações"],
      security: [{ bearerAuth: [] }],
      summary: "Visualiza a contagem das notificações",
      description:"Conta quantas notificações a para o usuário informado, notificações não lidas.",
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
      responses: respostaOK(200, "Resposta da notificação", "#/components/schemas/NotificacaoGET")
    },
  },
};

export default notificacaoPaths;