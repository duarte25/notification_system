const notificacaoSchemas = {
  NotificacaoPOST: {
    type: "object",
    properties: {
      usuario_id: {
        type: "string",
        description: "ID do usuário",
        example: "690fca40ae911346df075721"
      },
      mensagem: {
        type: "string",
        description: "Mensagem da notificação",
        example: "Teste de mensagem"
      }
    }
  },
  NotificacaoGET: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        description: "ID da notificação",
        example: "661031feb4850e0c367e54ab"
      },
      usuario_id: {
        type: "string",
        description: "ID do usuário",
        example: "Admin"
      },
      mensagem: {
        type: "string",
        description: "Mensagem da notificação",
        example: "Teste de mensagem"
      },
      lida: {
        type: "boolean",
        description: "Mensagem lida?",
        example: false
      },
      createdAt: {
        type: "string",
        description: "Data da criação",
        example: "2025-11-09T23:30:58.405Z"
      },
      updatedAt: {
        type: "string",
        description: "Data da atualização",
        example: "2025-11-09T23:30:58.405Z"
      }
    }
  },
  NotificacaoLista: {
    type: "object",
    properties: {
      notificacoes: {
        type: "array",
        items: { $ref: "#/components/schemas/NotificacaoGET" }
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

export default notificacaoSchemas;
