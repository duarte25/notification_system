import { sendError } from "./mensagens";

// Definição do erro personalizado da API
export class APIError extends Error {
  code: number;
  errors?: any[];

  constructor(message: string | any[], code: number = 400, errors?: any[]) {
    // Se 'message' for um array, mantém como array no campo 'errors'
    if (Array.isArray(message)) {
      super("Erro de validação"); // Define uma mensagem genérica para o campo 'message'
      this.errors = message; // Armazena o array de erros no campo 'errors'
    } else {
      super(message); // Caso contrário, usa a mensagem diretamente
      this.errors = errors; // Armazena os erros adicionais, se fornecidos
    }

    // Configura o protótipo para que o stack trace funcione corretamente
    Object.setPrototypeOf(this, new.target.prototype);
    this.code = code;
  }
}

// Função para envolver a execução de funções assíncronas com tratamento de exceções
export const wrapException = (fn: Function) => {
  return async (req: any, res: any, next: Function): Promise<any> => {
    // Medir o tempo de execução
    let tempoInicio: number | undefined;
    if (process.env.DEBUGLOG === "true") {
      tempoInicio = performance.now();
    }

    try {
      return await fn(req, res, next);
    }
    catch (err: any) {
      if (err instanceof APIError) {
        // Erro retornado da API personalizada
        return sendError(res, err.code, err.errors || err.message);
      } else if (err.name === "ValidationError") {
        // Erros de validação do mongoose
        let errors = [{ message: "Erros no model do Mongoose" }];

        Object.keys(err.errors).forEach((key) => {
          errors.push({
            message: err.errors[key].message,
            // path: key
          });
        });

        return sendError(res, 400, errors);
      } else {
        // Erro desconhecido
        console.error(err);
        return sendError(res, 500, [{ message: err.message || "" + err }]);
      }
    } finally {
      // Medir o tempo de execução
      if (process.env.DEBUGLOG === "true" && tempoInicio) {
        const millis = parseInt((performance.now() - tempoInicio).toString());
        console.log(millis + " ms");
      }
    }
  };
};