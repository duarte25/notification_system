import messages from "../../utils/mensagens";

export const respostaOK = (codigo, description, data) => {
  if (!data) {
    // por exemplo no delete, não tem retorno
    data = {
      type: "array",
      example: []
    };
  } else if (typeof data !== "object") {
    data = {
      $ref: data
    };
  }

  return {
    ["" + codigo]: {
      description: description,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: data,
              error: {
                type: "boolean",
                example: false
              },
              code: {
                type: "integer",
                example: codigo
              },
              message: {
                type: "string",
                example: messages.httpCodes[codigo]
              },
              errors: {
                type: "array",
                example: []
              }
            }
          }
        }
      }
    }
  };
};

export const respostaPaginadaOK = (codigo, description, data) => {
  if (typeof data !== "object") {
    data = {
      $ref: data
    };
  }

  return {
    ["" + codigo]: {
      description: description,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: data
              },
              resultados: {
                type: "integer",
                example: 1
              },
              limite: {
                type: "integer",
                example: 16
              },
              pagina: {
                type: "integer",
                example: 1
              },
              totalPaginas: {
                type: "integer",
                example: 1
              },
              error: {
                type: "boolean",
                example: false
              },
              code: {
                type: "integer",
                example: codigo
              },
              message: {
                type: "string",
                example: messages.httpCodes[codigo]
              },
              errors: {
                type: "array",
                example: []
              }
            }
          }
        }
      }
    }
  };
};