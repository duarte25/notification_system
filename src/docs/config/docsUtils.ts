import messages from "../../utils/mensagens";

type HttpCode = keyof typeof messages.httpCodes;

export const respostaOK = (codigo: HttpCode, description: string, data?: any) => {
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

export const respostaPaginadaOK = (codigo: HttpCode, description: string, data?: any) => {
  if (typeof data !== "object") {
    data = { $ref: data };
  }

  return {
    [String(codigo)]: {
      description,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: data, // agora pode ser objeto complexo
              error: { type: "boolean", example: false },
              code: { type: "integer", example: codigo },
              message: {
                type: "string",
                example: messages.httpCodes[codigo]
              },
              errors: { type: "array", example: [] }
            }
          }
        }
      }
    }
  };
};
